import { ProjectData } from "../../../../services/portfolio/types";

export interface FormModalProps {
    mode: 'create' | 'edit';
    projectData?: ProjectData;
    id?: string;
}