import {Client, Account, ID } from 'appwrite';
import conf from '../conf/conf';

export class AuthService{
    client = new Client();
    account;

    constructor (){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

            this.account = new Account(this.client)
    }

    async createAccount ({ email, password, name, confirm_password}) {
        try {
            const id = ID.unique()            
            const userAccount = await this.account.create(id, email, password, name, confirm_password )

            if (userAccount) {
                return this.login({email, password})
            } else {
                return false
            }

        } catch (error) {
            console.log("Backend :: createAccount :: error", error)
            throw error          
        }
    }

    async login ({email, password}) {
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            console.log("Backend :: login :: error", error)
            throw error
        }
    }

    async getCurrentUser () {
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Backend :: getCurrentUser :: error", error)
        }

        return null
    }

    async logout () {
        try {
            return this.account.deleteSessions()
        } catch (error) {
            console.log("Backend :: logout :: error", error)
            throw error
        }
    }
    
    async googleAuth(){
        try {
            return this.account.createOAuth2Session(
                'google',
                'https://blog-hub-navy.vercel.app/',
                'https://blog-hub-navy.vercel.app/login'
            );
        } catch (error) {
            console.log("Backend :: googleAuth :: error", error)
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;