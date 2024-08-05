'use client'
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
const Document = () => {
  return (
    <div className='new-docpg'>
       
      <Editor />
     
    </div>
  )
}

export default Document
