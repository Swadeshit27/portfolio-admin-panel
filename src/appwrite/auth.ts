import conf from "./conf";
import { Client, Account } from "appwrite";
import { loginProps } from "@/types";

export class AuthService {
    private client: Client;
    private account: Account;

    constructor() {
        this.client = new Client()
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async login({ email, password }: loginProps) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Appwirte Service : : login : : error : ", error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwirte Service : : getCurrentUser : : error : ", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSession("current")
        } catch (error) {
            console.log("Appwirte Service : : logout : : error : ", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService