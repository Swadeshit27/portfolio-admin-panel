import conf from "./conf";
import { Client, ID, Databases, Storage, } from "appwrite";
import { infoProps } from "@/types";

export class MyInfoService {
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

    async addInfo(data: infoProps) {
        console.log(data)
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMyInfoCollectionId,
                ID.unique(),
                data
            )
        } catch (error) {
            console.log("Info Service : : addInfo : : error : ", error);
            throw error;
        }
    }

    async updateInfo(documentId: string, data: infoProps) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMyInfoCollectionId,
                documentId,
                data
            )
        } catch (error) {
            console.log("Info Service : : updateInfo : : error : ", error);
            throw error;
        }
    }

    async deleteInfo(documentId: string) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMyInfoCollectionId,
                documentId,
            )
            return true;
        } catch (error) {
            console.log("Info Service : : deleteInfo : : error : ", error);
            return false;
        }
    }

    async getAllInfo() {
        try {
            return this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteMyInfoCollectionId,
            )
        } catch (error) {
            console.log("Info Service : : getAllInfo : : error : ", error);
            throw error;
        }
    }

    async getInfoById(documentId: string) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteMyInfoCollectionId,
                documentId,
            )
        } catch (error) {
            console.log("Info Service : : getInfoById : : error : ", error);
            throw error;
        }
    }
}

const myInfoService = new MyInfoService();
export default myInfoService