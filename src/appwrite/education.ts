import conf from "./conf";
import { Client, ID, Databases, Storage, } from "appwrite";
import { educationProps } from "@/types";

export class EducationService {
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

    async addEducation(data: educationProps) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEducationCollectionId,
                ID.unique(),
                data
            )
        } catch (error) {
            console.log("Education Service : : addEducation : : error : ", error);
            throw error;
        }
    }

    async updateEducation(documentId: string, data: educationProps) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEducationCollectionId,
                documentId,
                data
            )
        } catch (error) {
            console.log("Education Service : : updateEducation : : error : ", error);
            throw error;
        }
    }

    async deleteEducation(documentId: string) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEducationCollectionId,
                documentId,
            )
            return true;
        } catch (error) {
            console.log("Education Service : : deleteEducation : : error : ", error);
            return false;
        }
    }

    async getAllEducation() {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteEducationCollectionId,
            )
        } catch (error) {
            console.log("Education Service : : getAllEducation : : error : ", error);
            throw error;
        }
    }

    async getEducationById(documentId: string) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteEducationCollectionId,
                documentId,
            )
        } catch (error) {
            console.log("Education Service : : getEducationById : : error : ", error);
            throw error;
        }
    }
}

const educationService = new EducationService();
export default educationService