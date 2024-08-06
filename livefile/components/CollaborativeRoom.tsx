'use client'

import React, { useEffect, useRef } from 'react'
import { RoomProvider } from '@liveblocks/react/suspense'
import { ClientSideSuspense } from '@liveblocks/react/suspense'
import Header from './Header'
import { SignedOut } from '@clerk/nextjs'
import { SignedIn } from '@clerk/nextjs'
import { UserButton } from '@clerk/nextjs'
import { SignInButton } from '@clerk/nextjs'
import { Editor } from './editor/Editor'
import ActiveCollaborators from './activeCollaboratorsList'
import { useState } from 'react'
import { Input } from './ui/input'
import { currentUser } from '@clerk/nextjs/server'
import { updateDocument } from '@/lib/actions/room.actions'
import Image from 'next/image'

const CollaborativeRoom = ({roomId, roomMetadata}:CollaborativeRoomProps) => {
  //const [documentTitle, setDocumentTitle]=useState(roomMetadata.title);
  const [editing, setediting] = useState(false);
  const [loading, setloading] = useState(false);
  const [DocumentTitle, setDocumentTitle] = useState(roomMetadata.title)
  const conatinerRef=useRef<HTMLDivElement>(null);
  const inputRef=useRef<HTMLInputElement>(null);
  const currentUserType="editor";

  const updateTitleHandler=async(e:React.KeyboardEvent<HTMLInputElement>)=>{

    if(e.key==='Enter'){
      setloading(true);
      try{
        if(DocumentTitle!==roomMetadata.title){
          const updatedDocument=await updateDocument(roomId, DocumentTitle);
          if(updatedDocument){
            setediting(false)
          }
        }
      }
      catch(err){
        console.log(err);
      }
    }

  }

  useEffect(()=>{

    const handleClickOutside=(e:MouseEvent)=>{
      //containerRef.current accesses the current DOM element that the ref is attached to.
        // e.target as Node:
        // as Node is a TypeScript type assertion, indicating that e.target is being treated as a Node type.
      if(conatinerRef.current && !conatinerRef.current.contains(e.target as Node)){
        setediting(false);
        updateDocument(roomId, DocumentTitle);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);

    return()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }

  },[roomId, DocumentTitle])
  
  useEffect(()=>{
    if(editing && inputRef.current){
      inputRef.current.focus();
    }

  },[editing])
  return (
    <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <div className='collaborative-room'>
                <Header className="sticky left-0 top-0">
                  <div ref={conatinerRef} className='flex w-fit items-center justify-center gap-2'>
                    {editing && !loading ? (
                      <Input
                        type="text"
                        value={DocumentTitle}
                        ref={inputRef}
                        placeholder="Enter title"
                        onChange={(e) => setDocumentTitle(e.target.value)}
                        onKeyDown={updateTitleHandler}
                      // disable={!editing}
                        className="document-title-input"
                      />

                    ):(
                      <p className='document-title'> {DocumentTitle}</p>
                    )
                  }
                     {currentUserType === 'editor' && !editing && (
                      <Image
                        src="/assets/icons/edit.svg"
                        alt="edit"
                        width={24}
                        height={24}
                        onClick={() => setediting(true)}
                        className="pointer"
                      />
                    )}
                  {
                    currentUserType!=="editor" &&  !editing && (
                      <p className='view-only-tag'>View only</p>
                    )
                  }
                  {loading && <p className='text-sm text-gray-400'>saving...</p>}

                  </div>
                  <ActiveCollaborators />
                  {/* <ShareModal 
                    roomId={roomId}
                   // collaborators={users}
                    creatorId={roomMetadata.creatorId}
                    currentUserType={currentUserType}
                  /> */}
                <div className="flex items-center gap-2 lg:gap-4">
                <SignedOut>
                    <SignInButton />
                </SignedOut>

                <SignedIn>
                    <UserButton />
                </SignedIn>
                </div>
             </Header>

            <Editor />

          </div>
        </ClientSideSuspense>
      </RoomProvider>
  )
}

export default CollaborativeRoom
