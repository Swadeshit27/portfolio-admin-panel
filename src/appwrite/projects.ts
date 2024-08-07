import conf from "./conf";
import { Client, ID, Databases, Storage, } from "appwrite";
import { projectProps } from "@/types";

export class ProjectService {
    client = new Client()
    databases: Databases;
    bucket: Storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async addProject(data: projectProps) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                ID.unique(),
                data
            )
        } catch (error) {
            console.log("Project Service : : addProject : : error : ", error);
            throw error;
        }
    }

    async updateProject(documentId: string, data: projectProps) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                documentId,
                data
            )
        } catch (error) {
            console.log("Project Service : : updateProject : : error : ", error);
            throw error;
        }
    }

    async deleteProject(documentId: string) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                documentId,
            )
            return true;
        } catch (error) {
            console.log("Project Service : : deleteProject : : error : ", error);
            return false;
        }
    }

    async getAllProject() {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
            )
        } catch (error) {
            console.log("Project Service : : getAllProject : : error : ", error);
            throw error;
        }
    }

    async getProjectById(documentId: string) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteProjectsCollectionId,
                documentId,
            )
        } catch (error) {
            console.log("Project Service : : getProjectById : : error : ", error);
            throw error;
        }
    }
}

const projectService = new ProjectService();
export default projectService