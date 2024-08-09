import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const Header = ({ children, className }: HeaderProps) => {
 
  return (
    <div className={cn("header items-center justify-center", className)}>
      <Link href='/' className="">
      <div className='w-[50px] '>
        <Image 
            src="/assets/icons/file.png"
            alt="Logo with name" 
            width={120}
            height={32}
            className="hidden md:block"
          />

          <h1 className='text-md font-semibold  mt-[-9px]'>LiveFile</h1>


      </div>
      
        <Image 
          src="/assets/icons/logo-icon.svg"
          alt="Logo"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  )
}

export default Header