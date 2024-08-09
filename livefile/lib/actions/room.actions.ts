'use server'
import { liveblocks } from "../liveblocks";
import { nanoid } from 'nanoid'
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { parse } from "path";

export const createDocument=async({userId,email}:CreateDocumentParams)=>{
    const roomId = nanoid();
    try{
        const metadata={
            createdId:userId,
            email,
            title: 'Untitled'
        }

        const usersAccesses:RoomAccesses={
            [email]:['room:write']
        }

        const room=await liveblocks.createRoom(roomId,{
            metadata,
            usersAccesses,
            defaultAccesses:[]
        })

        revalidatePath('/');

        return parseStringify(room);


    }
    catch(err){
        console.log(err);
    }
    
}

export const getDocument=async({roomId, userId}:{roomId:string, userId:string})=>{
    try{
        const room=await liveblocks.getRoom(roomId);
        const hasAccess=Object.keys(room.usersAccesses).includes(userId);
        // if(!hasAccess){
        //     throw new Error('You do not have access to thei document');
        // }
        return parseStringify(room);
    }
    catch(err){
        console.log("error", err);
    }
}
export const getDocuments=async(email:string)=>{
    try{
        const rooms=await liveblocks.getRooms({userId:email});
        return parseStringify(rooms);

    }
    catch(error){
        console.log("error while getting rooms", error);
    }
}

export const updateDocument=async(roomId:string, title:string)=>{
    try{
        const updatedRoom=await liveblocks.updateRoom(roomId,{
            metadata:{
                title
            }
        })
        revalidatePath(`/documents/${roomId}`)
        return parseStringify(updatedRoom)
    }
    catch(err){
        console.log("error while updating doc", err)
    }
}
// const room = await liveblocks.createRoom("my-room-id", {
//     defaultAccesses: ["room:read", "room:presence:write"],
//     groupsAccesses: {
//       "my-group-id": ["room:write"],
//     },
//     usersAccesses: {
//       "my-user-id": ["room:write"],
//     },
//   });