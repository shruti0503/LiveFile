
import Image from "next/image";
import Header from "@/components/Header";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getDocuments } from "@/lib/actions/room.actions";
import Link from "next/link";
import { dateConverter } from "@/lib/utils";
import AddDocumenBtn from "@/components/AddDocumenBtn";

export default async function Home() {
  const clerkUser = await currentUser();
  if (!clerkUser) {
    redirect('/sign-in');
  }

  const roomDocuments = await getDocuments(clerkUser.emailAddresses[0].emailAddress);

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2 lg:gap-4">
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>
      <Image
            src="/assets/icons/file.png"
            alt="Document"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocumenBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
      <ul className="document-ul">
        {roomDocuments && roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
          <li key={id} className="document-list-item">
            <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
              <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                <Image
                  src="/assets/icons/file.png"
                  alt="file"
                  width={40}
                  height={40}
                />
              </div>
              <div className="space-y-1">
                <p className="line-clamp-1 text-lg">{metadata.title}</p>
                <p className="text-sm font-light text-blue-100">Created about {dateConverter(createdAt)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
     
    </main>
  );
}
