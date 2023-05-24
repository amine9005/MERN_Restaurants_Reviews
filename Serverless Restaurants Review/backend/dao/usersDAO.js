import { response } from "express";
import mongodb from "mongodb";

let users 

export default class UsesrDAO{

    static async injectDB(conn){
        if(users){
            return
        }
        try{
            users = await conn.db(process.env.RESTREVIEWS_NS).collection('users');
        } catch (e){
            console.log("Unable to connect to MongoDB users collection: "+e);
        }
    }

    static async getUser(uid){
            try{
                const response = await users.findOne({uid:uid});
                return response 
            } catch (e){
                console.log("Unable to connect to Find user: "+e);
            }
            
        } 

    static async addUser(uid,name){
        try{
            const userDoc = {
                uid: uid,
                name:name,
            }

            return await users.insertOne(userDoc);
        } catch (e){
            console.log("Unable to connect to Add user: "+e);
                
        }
    }
}