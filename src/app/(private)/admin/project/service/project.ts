
export interface Project {
    id: string;
    title: string;
    description: string;
    prefix: string;
    createdAt: string;
    status: string;
}

export interface AddProjectModel {
    title: string;
    description: string;
    prefix: string;
    members: string[];
}

export interface EditProjectModel {
    id: string;
    title: string;
    description: string;
}