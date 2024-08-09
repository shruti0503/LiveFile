import { SignUp } from '@clerk/nextjs'
import Image from 'next/image'
import { motion } from "framer-motion";

const SignUpPage = () => {
  return (
    <main className="auth-page">
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          > */}
            <div className='flex items-center justify-center'>
              <Image 
                src="/assets/icons/file.png"
                alt="Logo with name" 
                width={120}
                height={32}
                className="hidden md:block"
              />
              <h1 className='text-4xl font-extrabold '>LiveFile</h1>
            </div>
          {/* </motion.div> */}

      
      <SignUp />
    </main>
  )
}


export default SignUpPage