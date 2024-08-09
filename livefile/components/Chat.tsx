import React from 'react'
import clsx from 'clsx';
import { ClipboardCopy } from 'lucide-react';

type sentByType="ai" | "user";

interface ChatProps{
    text:String,
    sentBy: sentByType
}

const Chat = ({text, sentBy}:ChatProps) => {
  return (
    <div className={clsx(`bg-[#0f1c34] p-[13px] flex w-full h-full  text-white`,{
        "justify-end": sentBy === "user",
      "rounded-bl-none rounded-br-xl rounded-t-xl": sentBy === "ai", // Left-bottom corner 0, right-bottom corner rounded
       "rounded-bl-xl rounded-br-none rounded-t-xl": sentBy === "user", // Right-bottom corner 0, left-bottom corner rounded

    })}>
        <p className='w-full'>{text}</p>
      {
        sentBy==="ai" &&
        <ClipboardCopy />
      }
    </div>
  )
}

export default Chat
