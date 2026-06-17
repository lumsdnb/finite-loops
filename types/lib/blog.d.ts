export interface BlogPost {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    content: string;
    author: string;
}
export declare const posts: BlogPost[];
export declare function getPostBySlug(slug: string): BlogPost | undefined;
