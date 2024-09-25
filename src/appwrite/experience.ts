import conf from "./conf";
import { Client, ID, Databases, Storage, Query, } from "appwrite";
import { ExperienceProps } from "@/types";

export class ExperienceService {
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

    async addExperience(data: ExperienceProps) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteExperienceId,
                ID.unique(),
                data
            )
        } catch (error) {
            console.log("Education Service : : addEducation : : error : ", error);
            throw error;
        }
    }

    async updateExperience(documentId: string, data: ExperienceProps) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteExperienceId,
                documentId,
                data
            )
        } catch (error) {
            console.log("Education Service : : updateEducation : : error : ", error);
            throw error;
        }
    }

    async deleteExperience(documentId: string) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteExperienceId,
                documentId,
            )
            return true;
        } catch (error) {
            console.log("Education Service : : deleteEducation : : error : ", error);
            return false;
        }
    }

    async getAllExperience() {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteExperienceId,
                [Query.limit(100)]
            )
        } catch (error) {
            console.log("Education Service : : getAllEducation : : error : ", error);
            throw error;
        }
    }

    async getExperienceById(documentId: string) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteExperienceId,
                documentId,
            )
        } catch (error) {
            console.log("Education Service : : getEducationById : : error : ", error);
            throw error;
        }
    }
}

const experienceService = new ExperienceService();
export default experienceService