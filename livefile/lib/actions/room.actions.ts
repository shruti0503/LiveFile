'use server'
import { liveblocks } from "../liveblocks";

export const createDocument=async({userId,email}:Create)=>{
    const room = await liveblocks.createRoom("my-room-id", {
        defaultAccesses: ["room:read", "room:presence:write"],
        groupsAccesses: {
          "my-group-id": ["room:write"],
        },
        usersAccesses: {
          "my-user-id": ["room:write"],
        },
      });
}