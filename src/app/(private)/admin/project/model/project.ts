
export interface Project {
    id: string;
    name: string;
    description: string;
    prefix: string;
    createdAt: string;
    status: string;
}

export interface AddProjectModel {
    name: string;
    description: string;
    prefix: string;
    members: string[];
}

export interface EditProjectModel {
    id: string;
    name: string;
    description: string;
}
