import './globals.css'
import { Inter as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"
import { Metadata } from 'next/types';
import { dark } from "@clerk/themes"
import { ClerkProvider } from '@clerk/nextjs';
import Provider from './Provider';

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export const metadata: Metadata = {
  title: "LiveFile",
  description:
    "Go-to Doc edior",
  icons: {
    icon: "/assets/icons/logoFull.png",
  },
};

export default function RootLayout({ children }: {children:React.ReactNode}) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
      variables: { 
        colorPrimary: "#3371FF" ,
        fontSize: '16px'
      },
    }}
  >
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Provider>
          {children}
        </Provider>       
      </body>
    </html>
    </ClerkProvider>
  )
}
