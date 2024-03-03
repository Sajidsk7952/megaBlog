import { config } from "../config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;
    constructor(){
        this.client.setEndpoint(config.appwriteURL).setProject(config.appwriteProjectID);
        this.account = new Account(this.client);
    }
    async createAccount({email,password,name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email,password,name);
            if(userAccount){
                //login the user and move to profile section
                return this.loginAccount(email, password);
            }else{
                //show the failure message
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }
    async loginAccount({email,password}){
        try {
            const userAccount = await this.account.createEmailPasswordSession(email,password);
            return userAccount;
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        }
    }

    async logout(){
        try {
            const msg = await this.account.deleteSessions('current');
            console.log(msg);
        } catch (error) {
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;