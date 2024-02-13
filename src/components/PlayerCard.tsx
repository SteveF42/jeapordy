import React from 'react'
import { BsDash, BsPlus } from 'react-icons/bs'

const PlayerCard = () => {
    return (
        <div className='max-w-44 gap-y-3 flex flex-col items-center bg-third text-white rounded-md p-4'>
            <h1 className='text-lg text-center font-medium'>THIS IS A REALLY LONG NAME</h1>
            <span className='font-medium border-b-2'>9999</span>
            <div className='flex justify-around w-full text-lg'>
                <button className='bg-primary rounded-md min-w-8'><BsDash className='mx-auto' /></button>
                <button className=' bg-secondary rounded-md min-w-8'><BsPlus className='mx-auto' /></button>
            </div>
        </div>
    )
}

export default PlayerCard