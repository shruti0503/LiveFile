
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
const Document =async ({params:{id}}:SearchParamProps) => {
  const clerkUser=await currentUser();
  if(!clerkUser) redirect('/sign-in');
  const room=await getDocument({
    roomId:id,
    userId:clerkUser.emailAddresses[0].emailAddress,
  })

  if(!room) redirect('/')

  return (
    <main className='flex w-full flex-col items-center'>
      {/* @ts-ignore */}
      <CollaborativeRoom
       roomId={id}
       roomMetadata={room.metadata}
      
      />
     
    </main>
  )
}

export default Document
