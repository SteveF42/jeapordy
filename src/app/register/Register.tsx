import React from 'react'
import CredentialsForm from '@/components/CredentialsForm'

const Register = () => {

    
    return (
        <div className='h-screen flex items-center justify-center text-white'>
            <div className='flex flex-col space-y-8 bg-white rounded-xl min-w-64 max-w-md p-10 w-full'>
                <div>
                    <h1 className='text-3xl text-center mb-5 font-bold text-black'>Register</h1>
                    <p className='text-lg text-center text-gray-500'>Register an account plz :3</p>
                </div>
                <CredentialsForm />
            </div>
        </div>
    )
}

export default Register;