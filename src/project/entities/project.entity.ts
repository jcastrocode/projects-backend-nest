import { Project  as ProjectModel} from "@prisma/client";

export class ProjectEntity implements ProjectModel{
    id: number; 
    title: string; 
    content: string; 
    createdAt: Date; 
    updatedAt: Date; 
    deletedAt: Date;
    authorId: number; 
}
