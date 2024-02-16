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

    async createAccount ({username, email, password, confirm_password}) {
        try {
            const id = ID.unique()            
            const userAccount = await this.account.create(id, username, email, password, confirm_password)

            if (userAccount) {
                return this.login({username, password})
            } else {
                return userAccount
            }

        } catch (error) {
            console.log("Backend :: createAccount :: error", error)
            throw error          
        }
    }

    async login ({username, password}) {
        try {
            return await this.account.createEmailSession({username, password})
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
                'http://localhost:5173/',
                'http://localhost:5173/login'
            );
        } catch (error) {
            console.log("Backend :: googleAuth :: error", error)
            throw error
        }
    }
}

const authService = new AuthService();

export default authService;