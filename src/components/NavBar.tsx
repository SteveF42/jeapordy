"use client"
import React, { useEffect, useState } from 'react'
import './NavBar.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const NavBar = ({ navTitle }: { navTitle: string }) => {
    const pathName = usePathname();

    return (
        <div className='navbar'>
            <div className="navbar-left">
                <h1 className='text-center hover:-translate-y-1'><Link href='/'> {navTitle} </Link></h1>
            </div>

            <div className='navbar-right'>
                <div className={`${pathName.startsWith('/account') ? 'border-b-2' : ''} hover:-translate-y-1`}>Account</div>
                <div className={`${pathName.startsWith('/play') ? 'border-b-2' : ''} hover:-translate-y-1`}>Play</div>
                <div className={`${pathName.startsWith('/board-hub') ? 'border-b-2' : ''} hover:-translate-y-1`}><Link href='/board-hub'>MyBoards</Link></div>
                <div className={`${pathName.startsWith('/about') ? 'border-b-2' : ''} hover:-translate-y-1`}>About</div>
            </div>
        </div>
    )
}

export default NavBar