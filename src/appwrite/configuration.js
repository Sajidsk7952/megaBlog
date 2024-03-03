import { config } from "../config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(config.appwriteURL)
      .setProject(config.appwriteProjectID);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }
  async createPost({ title, slug, content, featuredImg, status, userId }) {
    try {
      const post = await this.databases.createDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        { title, content, featuredImg, status, userId }
      );
      console.log(post);
      return post;
    } catch (error) {
      console.log("Error creating  Post: ", error);
    }
  }

  async updatePost(slug, { title, content, featuredImg, status }) {
    try {
      const updatedPost = await this.databases.updateDocument(
        config.appwriteDatabaseID,
        config.appwriteCollectionID,
        slug,
        { title, content, featuredImg, status }
      );
      return updatedPost;
    } catch (error) {
      console.log("Error updating  Post:", error);
    }
  }

  async deletePost(slug){
    try {
        const deleteMsg = await this.databases.deleteDocument(config.appwriteDatabaseID,config.appwriteCollectionID,slug);
        return deleteMsg;
    } catch (error) {
        console.log("Error deleting the post:",error);
    }
  }

  async getPost(slug){
    try {
        const post = await this.databases.getDocument(config.appwriteDatabaseID,config.appwriteCollectionID,slug);
        return post;
    } catch (error) {
        console.log("Error getting the post",error);
    }
  }

  async getActivePosts(queries = Query.equal("status",['active'])){
    try {
        const allPosts = await this.databases.listDocuments(config.appwriteDatabaseID,config.appwriteCollectionID,queries);
        return allPosts;
    } catch (error) {
        console.log("Error getting  active  posts",error);
    }
  }

  async createFile(file){
    try {
        return await this.storage.createFile(config.appwriteBucketID,ID.unique(),file)
    } catch (error) {
        console.log("Error creating File in Storage",error);
    }
  }

  async deleteFile(fileId){
    try {
        return await this.storage.deleteFile(config.appwriteBucketID,fileId);
    } catch (error) {
        console.log("Error in deleting file",error);
    }
  }

  getFilePreview(fileId){
    const file = this.storage.getFilePreview(config.appwriteBucketID,fileId);
    return file;
  }
}

const service = new Services();

export default service;
