"use client"
import React, { useState } from 'react'
import { InputSecondary } from './Inputs'
import { SecondaryButton } from './Buttons'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const CredentialsForm = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState(false);
    const router = useRouter();

    const setTextField = (setProp: any) => {

        return (e: React.FormEvent<HTMLInputElement>) => {
            setProp(e.currentTarget.value)
            setSubmitted(false);
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(password)
        setSubmitted(true);

        const res = await fetch('api/auth/register', {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        if (res.status == 201) {
            signIn("credentials", {
                username,
                password,
                redirect: false
            })
            router.push('/');
            router.refresh();
        } else {
            setError(true);
        }

    }

    return (
        <form className='flex flex-col space-y-4'>
            {error && <p className='mt-2 text-white text-center bg-red-500 p-2 rounded-md w-fit mx-auto'>Username already exists</p>}
            <div className="sm:col-span-3">
                <div className="mt-2">
                    <InputSecondary placeholder="Username" type="text" onChange={setTextField(setUsername)} required autofill="false" />
                </div>
                <div className="sm:col-span-3 mt-3">
                    <InputSecondary placeholder="Password" type="password" onChange={setTextField(setPassword)} required autofill="false" />
                </div>
            </div>
            <SecondaryButton onClick={handleSubmit} sx={'disabled:opacity-50'} disabled={submitted}>Register</SecondaryButton>
        </form>
    )
}

export default CredentialsForm