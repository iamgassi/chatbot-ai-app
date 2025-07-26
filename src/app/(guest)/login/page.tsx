import Avatar from '@/components/Avatar'
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex py-10 md:py-0 flex-col flex-1 items-center justify-center bg-[#72aff0] h-full'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-1'>
        <div className='flex flex-row md:flex-col justify-center items-center space-y-5 text-white gap-5'>
            <div className='rounded-full bg-gray-200'>
                <Avatar className='lg:w-60 lg:h-60 md:w-50 md:h-50' />
            </div>
            <div className='text-center'>
                <h1 className='text-2xl md:text-4xl font-bold'>Assistly</h1>
                <h2 className='text-base font-light'>Your customizable AI Chat Agent</h2> 
                <h3 className='my-5 font-bold'>Sign in to get started</h3>

            </div>

        </div>
        <SignIn routing='hash' fallbackRedirectUrl={'/'}/>
      </div>
    </div>
  )
}

export default LoginPage
