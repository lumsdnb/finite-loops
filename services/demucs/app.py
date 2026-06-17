import os
import shutil
import tempfile
import zipfile
from pathlib import Path

from fastapi import FastAPI, File, Query, UploadFile, HTTPException
from fastapi.responses import FileResponse

app = FastAPI()

MAX_FILE_SIZE = 50 * 1024 * 1024  # 50MB
ALLOWED_EXTENSIONS = {".mp3", ".wav", ".flac", ".ogg"}
VALID_STEMS = {"vocals", "drums", "bass", "other"}


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/separate")
async def separate(
    file: UploadFile = File(...),
    stems: str = Query("vocals,drums,bass,other"),
):
    # Validate stems
    requested = {s.strip() for s in stems.split(",")}
    invalid = requested - VALID_STEMS
    if invalid:
        raise HTTPException(400, f"Invalid stems: {invalid}. Valid: {VALID_STEMS}")
    if not requested:
        raise HTTPException(400, "At least one stem must be selected")

    # Validate file extension
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(400, f"Unsupported format: {ext}. Accepted: {ALLOWED_EXTENSIONS}")

    # Read and validate file size
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(413, f"File too large. Max size: {MAX_FILE_SIZE // (1024*1024)}MB")

    tmp_dir = tempfile.mkdtemp()
    try:
        # Save uploaded file
        input_path = os.path.join(tmp_dir, f"input{ext}")
        with open(input_path, "wb") as f:
            f.write(contents)

        # Run demucs separation
        from demucs.api import Separator

        separator = Separator(model="htdemucs", segment=None)
        _, separated = separator.separate_audio_file(input_path)

        # Save separated stems to files
        import torchaudio

        output_dir = os.path.join(tmp_dir, "stems")
        os.makedirs(output_dir, exist_ok=True)

        for stem_name in requested:
            if stem_name not in separated:
                continue
            stem_audio = separated[stem_name]
            stem_path = os.path.join(output_dir, f"{stem_name}.wav")
            torchaudio.save(stem_path, stem_audio.cpu(), sample_rate=separator.samplerate)

        # Create ZIP of requested stems
        zip_path = os.path.join(tmp_dir, "stems.zip")
        with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
            for stem_file in Path(output_dir).glob("*.wav"):
                zf.write(stem_file, stem_file.name)

        return FileResponse(
            zip_path,
            media_type="application/zip",
            filename="stems.zip",
            background=None,
        )
    finally:
        # Schedule cleanup after response is sent
        import asyncio

        async def cleanup():
            await asyncio.sleep(5)
            shutil.rmtree(tmp_dir, ignore_errors=True)

        asyncio.get_event_loop().create_task(cleanup())
