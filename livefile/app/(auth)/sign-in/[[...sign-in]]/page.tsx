import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

const SignInPage = () => {
  return (
    <main className="auth-page">
       <div className='flex items-center  justify-center'>
        <Image 
            src="/assets/icons/file.png"
            alt="Logo with name" 
            width={120}
            height={32}
            className="hidden md:block"
          />

          <h1 className='text-4xl font-extrabold '>LiveFile</h1>


      </div>
      <SignIn />
    </main>
  )
}

export default SignInPage