"use client"

import React from 'react'
import { PrimaryButton, SecondaryButton } from '../components/Buttons'
import { useRouter } from 'next/navigation'

const HomePage = () => {
    const router = useRouter();
    const goLogin = () => {
        router.push('/login')
    }

    const goSignUp = () => {
        router.push('/register')
    }

    return (
        <div className='font-mono h-[80vh] flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-4xl sm:text-5xl font-bold mb-4 text-center'>NOT JEAPORDY!</h1>
                <div className='flex space-x-4'>
                    <PrimaryButton onClick={goLogin}>Login</PrimaryButton>
                    <SecondaryButton onClick={goSignUp}>Sign Up</SecondaryButton>
                </div>
            </div>
        </div>
    )
}

export default HomePage