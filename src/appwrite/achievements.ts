import conf from "./conf";
import { Client, ID, Databases, Storage, } from "appwrite";
import { AchievementProps } from "@/types";

export class AchievementService {
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

    async addAchievement(data: AchievementProps) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAchievementId,
                ID.unique(),
                data
            )
        } catch (error) {
            console.log("Education Service : : addEducation : : error : ", error);
            throw error;
        }
    }

    async updateAchievement(documentId: string, data: AchievementProps) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAchievementId,
                documentId,
                data
            )
        } catch (error) {
            console.log("Education Service : : updateEducation : : error : ", error);
            throw error;
        }
    }

    async deleteAchievement(documentId: string) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAchievementId,
                documentId,
            )
            return true;
        } catch (error) {
            console.log("Education Service : : deleteEducation : : error : ", error);
            return false;
        }
    }

    async getAllAchievements() {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteAchievementId,
            )
        } catch (error) {
            console.log("Education Service : : getAllEducation : : error : ", error);
            throw error;
        }
    }

    async getAchievementById(documentId: string) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteAchievementId,
                documentId,
            )
        } catch (error) {
            console.log("Education Service : : getEducationById : : error : ", error);
            throw error;
        }
    }
}

const achievementService = new AchievementService();
export default achievementService