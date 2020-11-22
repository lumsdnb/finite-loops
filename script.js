const releases = document.querySelectorAll('.release');

releases.forEach((release) => {
  release.addEventListener('click', () => {
    console.log(`you chose ${release.textContent.trim()}`);
  });
});
