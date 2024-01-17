/* eslint-disable no-useless-catch */
/* eslint-disable no-unused-vars */
import Config from "../Config/config.js";
import { Client, Account, ID } from "appwrite";

export class Authservice {
  Client = new Client();
  account;
  constructor() {
    this.Client.
        setEndpoint(Config.appwriteUrl)
        .setProject(
            Config.appwriteProjectId
        );
    this.account = new Account(this.Client);
  }

  async createAccount({ email, password, name }) {
    try {
        const userAccount= await this.account.create(ID.unique(), email, password, name);
        if(userAccount){
           //call another method
           return this.logIn({email,password});
        }else{
            return userAccount;
        }
    } catch (error) {
        throw error;
    }
  }

  async logIn({email,password}){
    try {
        return await this.account.createEmailSession(email,password);
    } catch (error) {
        throw error;
    }
  }

  async getCurrentUser(){
    try {
        return await this.account.get();
    } catch (error) {
        console.log("appwrite service ::getCurrentUser :: error",error);
    }
  }

  async logout(){
    try {
        return await this.account.deleteSessions();
    } catch (error) {
      console.log("appwrite service ::getCurrentUser :: error",error);
    }
  }
}

const authservice = new Authservice();

export default authservice;
