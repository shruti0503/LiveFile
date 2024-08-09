'use client'
import React, { useState } from 'react';
import { Input } from './ui/input';
import Image from 'next/image';
import { Button } from './ui/button';
import Chat from './Chat';
import clsx from 'clsx';
import { useUser } from '@clerk/nextjs';

const GptBox = () => {
    const { user } = useUser();
    console.log("user is", user);

    const [chatInput, setChatInput] = useState('');
    const [chats, setChats] = useState([
        { text: "Hi! how can I help you..?", sentBy: "ai", id: "12", date: new Date("2024-08-09T10:00:00Z") },
        { text: "I need a story", sentBy: "user", id: "34", date: new Date("2024-08-09T10:01:00Z") }
    ]);

    const generateTextHandler = () => {
        const newText = {
            text: chatInput,
            sentBy: "user",
            id: Date.now().toString(), // Unique ID
            date: new Date(), // Current date and time
        };

        const newChats = [...chats, newText];
        setChats(newChats);
        setChatInput(''); // Clear the input field after sending
        // GenerateAIText(chatInput)
    };

    return (
        <div className='GPT_box text-white'>
            <h1 className='font-bold text-xl ms-2 flex w-full justify-between items-center'>ChatGpt
                <Image
                    src="/assets/icons/gpt.jpeg"
                    alt="gpt"
                    className='rounded-2xl me-2 mb-1'
                    width={40}
                    height={40}
                />
            </h1>
            <div className='chat-box mt-2 p-[10px] overflow-y-scroll bg-[#0b1527] gap-4 h-[85%] flex flex-col rounded-xl items-end justify-end'>
                {
                    chats
                        .sort((a, b) => a.date.getTime() - b.date.getTime()) // Sort chats by date
                        .map((chat, index) => (
                            <div
                                key={index}
                                className={clsx("flex w-full items-end", {
                                    "justify-end": chat.sentBy === "user",
                                })}
                            >
                                {/* @ts-ignore */}
                                {chat.sentBy === "ai" && (
                                    <Image
                                        src='/assets/icons/ai.jpeg'
                                        alt="AI img"
                                        width={100}
                                        height={100}
                                        className="rounded-full w-[25%] h-[65%]"
                                    />
                                )}
                                {/* @ts-ignore */}
                                <Chat text={chat?.text} sentBy={chat?.sentBy as sentByType} />
                                {chat.sentBy === "user" && (
                                    <Image
                                        src={user?.imageUrl as string}
                                        alt="User Profile Image"
                                        width={100}
                                        height={100}
                                        className="rounded-full w-[25%] h-[65%]"
                                    />
                                )}
                            </div>
                        ))
                }
            </div>
            <div className='bottom-box gap-3 flex'>
                <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder='Enter text for gpt'
                    className='bg-[#0b1527] border-0 outline-none'
                />
                <Button onClick={generateTextHandler}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default GptBox;
