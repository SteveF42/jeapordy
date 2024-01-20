import { PrimaryButton, SecondaryButton } from '@/components/Buttons'
import React from 'react'
import { InputSecondary } from '@/components/Inputs'

const LogIn = () => {
    return (
        <div className='h-screen flex items-center justify-center text-white'>
            <div className='flex flex-col space-y-8 bg-white rounded-xl min-w-64 max-w-md p-10 w-full'>
                <div>
                    <h1 className='text-3xl text-center mb-5 font-bold text-black'>Log In</h1>
                    <p className='text-lg text-center text-gray-500'>You will be redirected to the homepage</p>
                </div>
                <form className='flex flex-col space-y-4'>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <InputSecondary placeholder="Username" type="password"/>
                        </div>
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <InputSecondary placeholder="Password" type="password"></InputSecondary>
                            </div>
                        </div>
                    </div>
                    <SecondaryButton>Log In</SecondaryButton>
                </form>
            </div>
        </div>
    )
}

export default LogIn