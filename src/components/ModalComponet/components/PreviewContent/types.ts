export interface PreviewContentProps {
    title: string;
    author: string;
    avatar: string;
    date: string;
    tags: string;
    image: File | null | undefined;
    description: string;
    url: string;
    width?: string;
}