"use client"
import React, { useState } from 'react'
import { InputSecondary } from './Inputs'
import { SecondaryButton } from './Buttons'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

const CredentialsForm = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState(false);
    const router = useRouter();

    const setTextField = (setProp: any) => {

        return (e: React.FormEvent<HTMLInputElement>) => {
            setProp(e.currentTarget.value)
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(password)
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
            signIn("credentials",{
                username,
                password,
                redirect:false
            })
            router.push('/');
        }

    }

    return (
        <form className='flex flex-col space-y-4'>
            <div className="sm:col-span-3">
                <div className="mt-2">
                    <InputSecondary placeholder="Username" type="text" onChange={setTextField(setUsername)} required autofill="false" />
                </div>
                <div className="sm:col-span-3 mt-3">
                    <InputSecondary placeholder="Password" type="password" onChange={setTextField(setPassword)} required autofill="false" />
                </div>
            </div>
            <SecondaryButton onClick={handleSubmit}>Register</SecondaryButton>
        </form>
    )
}

export default CredentialsForm