import toast from "react-hot-toast";
import conf from "./conf";
import { Client, ID, Databases, Storage, } from "appwrite";

export class FileService {
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

    async uploadFile(file: any) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error: any) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            toast.error(error.message)
            return false
        }
    }

    async deleteFile(fileId: string) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId: string) {
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

}

const fileService = new FileService();
export default fileService