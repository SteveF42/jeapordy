'use client'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/navigation';

const page = async() => {
    signOut();
    redirect('/');
}

export default page