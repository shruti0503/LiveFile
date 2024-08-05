'use client'

import React from 'react'
import { RoomProvider } from '@liveblocks/react/suspense'
import { ClientSideSuspense } from '@liveblocks/react/suspense'
import Header from './Header'
import { SignedOut } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'

const CollaborativeRoom = ({children}:{children:React.ReactNode}) => {
  return (
    <RoomProvider id="my-room">
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <div className='collaborative-room'>
                <Header className="sticky left-0 top-0">
                <div className="flex items-center gap-2 lg:gap-4">
                
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                </div>
            </Header>

          </div>
        </ClientSideSuspense>
      </RoomProvider>
  )
}

export default CollaborativeRoom
