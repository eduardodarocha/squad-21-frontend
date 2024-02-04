export interface RegisterProjectProps{
    title: string;
    link: string;
    description: string;
    file: File;
    tags: string;
}

export interface ProjectData {
    id: string;
    user_name: string;
    title: string;
    tags: string;
    link: string;
    description: string;
    image_url: string;
    created_at: string;
  }
  

