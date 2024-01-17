/* eslint-disable no-unused-vars */
import Config from "../Config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  Client = new Client();
  databases;
  bucket;

  constructor() {
    this.Client.setEndpoint(Config.appwriteUrl).setProject(
      Config.appwriteProjectId
    );
    this.databases = new Databases(this.Client);
    this.bucket = new Storage(this.Client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("appwrite service ::updatePost :: error",error);

    }
  }
  async deletePost(slug) {
    try {
      return await this.databases.deleteDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getPost(slug) {
    
    try {
      return await this.databases.getDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionID,
        slug
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.databases.listDocuments(
          Config.appwriteDatabaseId,
          Config.appwriteCollectionID,
          queries
        )
      
    } catch (error) {
      console.log(error);
    }
  }
  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        Config.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile(
        Config.appwriteBucketId,
        fileId

        )
    } catch (error) {
      console.log(error);
    }
  }

  getFilePreview(fileId){
    return this.bucket.getFilePreview(
      Config.appwriteBucketId,
      fileId
    )
  }
}

const service = new Service();

export default service;
