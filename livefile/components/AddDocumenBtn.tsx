'use client'
import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { createDocument } from '@/lib/actions/room.actions'
import { useRouter } from 'next/navigation'

const AddDocumenBtn = ({userId,email}:AddDocumentBtnProps) => {
    const router=useRouter();

    const AddDocumenHandler=async()=>{
        try{
            const room= await createDocument({userId, email})
            if(room) router.push(`/documents/${room.id}`);

        }
        catch(err){
            console.log(err);
        }

    }

  return (
    <Button type='submit' onClick={AddDocumenHandler} className='gradient-blue flex gap-1 shadow-md'>
        <Image 
         src="/assets/icons/add.svg" alt="add" width={24} height={24}
        />
        <p className='hidden sm:block'>Start writing..</p>
    </Button>
  )
}

export default AddDocumenBtn
