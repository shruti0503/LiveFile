
import Image from "next/image";
import Header from "@/components/Header";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useState } from "react";
import AddDocumenBtn from "@/components/AddDocumenBtn";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const clerkUser=await currentUser();
  if(!clerkUser){
    redirect('/sign-in')

  }
  const documents=[];
  return (
    <main className="home-container">
    <Header className="sticky left-0 top-0">
      <div className="flex items-center gap-2 lg:gap-4">
        {/* <Notifications /> */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </Header>
    {documents.length>0 ? (
      <div>
        
      </div>
    ):
    <div className="document-list-empty">
      <Image 
        src="/assets/icons/doc.svg"
        alt="Document"
        width={40}
        height={40}
        className="mx-auto"
        />
        <AddDocumenBtn
          userId={clerkUser.id}
          email={clerkUser.emailAddresses[0].emailAddress}
         />
    </div>
    }
    </main>
  );
}
