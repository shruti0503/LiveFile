'use client'

import {
    LiveblocksProvider,
    RoomProvider,
    ClientSideSuspense,
  } from "@liveblocks/react/suspense";

import React from 'react'
import Loader from "@/components/Loader";
import { ReactNode } from "react";

const Provider = ({children}:{children:ReactNode}) => {
  return (
    <LiveblocksProvider  authEndpoint="/api/liveblocks-auth">
    {/* <RoomProvider id="my-room"> */}
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    {/* </RoomProvider> */}
  </LiveblocksProvider>
  )
}

export default Provider
