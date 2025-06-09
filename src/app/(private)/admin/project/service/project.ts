
export interface Project {
    id: string;
    title: string;
    description: string;
    prefix: string;
    createdAt: string;
}

export interface AddProjectModel {
    title: string;
    description: string;
    prefix: string;
    members: string[];
}