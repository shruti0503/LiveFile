
import React from 'react'
import Header from '@/components/Header'
import { Editor } from '@/components/editor/Editor'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { currentUser } from '@clerk/nextjs/server'
import { SignedIn } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { SignedOut } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import CollaborativeRoom from '@/components/CollaborativeRoom'
import { getDocument } from '@/lib/actions/room.actions'
import { getClerkUsers } from '@/lib/actions/user.actions'


const Document =async ({params:{id}}:SearchParamProps) => {

  const clerkUser=await currentUser();
  if(!clerkUser) redirect('/sign-in');
  const room=await getDocument({
    roomId:id,
    userId:clerkUser.emailAddresses[0].emailAddress,
  })

  if(!room) redirect('/')

  const userIds=Object.keys(room.usersAccesses);
  const users=await getClerkUsers({userIds});
  const usersData = users.map((user: User) => ({
    ...user,
    userType: room.usersAccesses[user.email]?.includes('room:write')
      ? 'editor'
      : 'viewer'
  }))


  const currentUserType = room.usersAccesses[clerkUser.emailAddresses[0].emailAddress]?.includes('room:write') ? 'editor' : 'viewer';

  return (
    <main className='flex w-full flex-col items-center'>
      {/* @ts-ignore */}
      <CollaborativeRoom
       roomId={id}
       roomMetadata={room.metadata}
       users={users}
       currentUserType={currentUserType}
      
      />
     
    </main>
  )
}

export default Document
