import {Client, ID, Databases, Storage, Query } from 'appwrite';
import conf from  '../conf/conf'

export class  AppwriteService{
    client = new Client();
    id = ID.unique()
    databases;
    storage;

    constructor () {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            this.databases = new Databases(this.client);
            this.storage = new Storage(this.client);
    }

    async createPost ({title, content, blogImage, userId}) {
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                this.id,
                {
                    title,
                    content,
                    blogImage,
                    userId,
                }
            )
        } catch (error) {
            console.log("Backend :: createPost :: error", error)
            throw error
        }
    }

    async updatePost ({id, title, content, blogImage}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                id,
                {
                    title,
                    content,
                    blogImage,
                }
            )
        } catch (error) {
            console.log("Backend :: updatePost :: error", error)
            throw error
        }
    }

    async deletePost (id) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                id,
            )
            return true
        } catch (error) {
            console.log("Backend :: deletePost :: error", error)
            return false
        }
    }

    async getPost (id) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                id,
            )
        } catch (error) {
            console.log("Backend :: getPost :: error", error) 
            return false
        }
    }

    async getAllPosts () {
        try {
            const postList = await this.databases.listDocuments(
                conf.appwriteDatabaseId, 
                conf.appwriteArticleCollectionId
            );
            return postList;
        } catch (error) {
            console.log("Backend :: getAllPosts :: error", error) 
            return null
        }
    }

    // FILE SERVICES 
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file

            )
        } catch (error) {
            console.log("Backend :: uploadFile :: error", error) 
            return null
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Backend :: deleteFile :: error", error) 
            return false
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    
    // USERNAME
    async chooseUsername({userId, username}) {
        try {

            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                ID.unique(),
                {
                    username,
                    userId
                }
            )
            return true
            
        } catch (error) {
            console.log("Backend :: Choose Username :: error", error)
            throw error;
        }
    }

    async updateUsername({id, username}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteUserCollectionId,
                id,
                {
                    username
                }
            )
        } catch (error) {
            console.log("Backend :: Update Username :: error", error) 
            
        }
    }
}

const appwriteService = new AppwriteService();

export default  appwriteService;