"use client"
import { PrimaryButton, SecondaryButton } from '@/components/Buttons'
import React, { useState } from 'react'
import { InputSecondary } from '@/components/Inputs'
import Link from 'next/link'
import { DiscordSignInButton } from '@/components/AuthButtons'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LogIn = () => {
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [displayError, setDisplayError] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const router = useRouter();

    const updateInput = (setParam: React.Dispatch<React.SetStateAction<string>>) => {
        return (e: React.FormEvent<HTMLInputElement>) => {
            const text = e.currentTarget.value;
            setParam(text);
            setSubmitted(false);
        }
    }

    const login = async (e: any) => {
        e.preventDefault();
        setSubmitted(true);
        const res = await signIn('credentials', {
            username,
            password,
            redirect: false
        })
        if (res?.ok) {
            router.replace('/')
            router.refresh();
        } else {
            setDisplayError(true);
        }
        console.log(res)
    }

    return (
        <div className='h-screen flex items-center justify-center text-white'>
            <div className='flex flex-col space-y-8 bg-white rounded-xl min-w-64 max-w-md p-10 w-full'>
                <div>
                    <h1 className='text-3xl text-center mb-5 font-bold text-black'>Login</h1>
                    <p className='text-lg text-center text-gray-500'>Plz Log in ty :)</p>
                    {
                        displayError && <p className='mt-2 text-white text-center bg-red-500 p-2 rounded-md w-fit mx-auto'>Invalid username or password</p>
                    }
                </div>
                <form className='flex flex-col space-y-4'>
                    <div className="sm:col-span-3">
                        <div className="mt-2">
                            <InputSecondary placeholder="Username" type="text" onChange={updateInput(setUsername)} />
                        </div>
                        <div className="sm:col-span-3">
                            <div className="mt-2">
                                <InputSecondary placeholder="Password" type="password" onChange={updateInput(setPassword)} />
                            </div>
                        </div>
                    </div>
                    <SecondaryButton onClick={login} sx={'disabled:opacity-50'} disabled={submitted}>Log In</SecondaryButton>
                    <span className='text-gray-500'>Register an account <Link href={'/register'}>HERE</Link></span>
                    <span className='text-lg text-gray-500 font-semibold border-b-2 text-center'>or</span>
                    <DiscordSignInButton />
                </form>
            </div>
        </div>
    )
}

export default LogIn