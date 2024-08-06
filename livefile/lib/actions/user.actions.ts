'use server'

import { clerkClient } from "@clerk/nextjs/server"
import { parseStringify } from "../utils";
export const getClerkUsers=async({userIds}:{userIds:string[]})=>{
    try{
        const {data}=await clerkClient.users.getUserList({
            emailAddress:userIds,
        })

        const users=data.map((user)=>({
            id:user.id,
            name:`${user.firstName} ${user.lastName}`,
            email:user.emailAddresses[0].emailAddress,
            avatar:user.imageUrl,

        })); //Immediate return 

        const sortedUsers=userIds.map((email)=>users.find((user)=>user.email===email)) //sorting on the baisi of id
        return parseStringify(sortedUsers)

    }
    catch(err){
        console.log("error fetching users",err);
    }
}