export interface ProjectProps{
    id: string;
    title?: string,
    description?: string;
    url?: string;
    avatar: string,
    image: string;
    author: string;
    date: string;
    tags: string;
    hasMenu?: boolean;
    hasTags?: boolean;
    onSettingChange?: (newSetting: string, id: string) => void;
}