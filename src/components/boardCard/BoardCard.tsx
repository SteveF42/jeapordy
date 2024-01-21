import React from 'react'

import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
type props = {
    board: {
        title: string,
        date: string
    }
}

const BoardCard = ({ board }: props) => {
    return (
        <div className='board-card flex-grow bg-third rounded-md text-gray-50 p-4 min-w-48 max-w-fit gap-x-4 flex flex-row justify-around border-2 border-primary hover:translate-x-0.5 hover:-translate-y-0.5'>
            <div className='info'>
                <h1 className='text-xl mb-1'>{board.title}</h1>
                <h2 className='text-base'>last edited: {board.date}</h2>
            </div>
            <div className='options flex items-center flex-col justify-between'>
                <BsFillTrash3Fill className='hover:cursor-pointer hover:scale-125' />
                <BsPencilSquare className='hover:cursor-pointer hover:scale-125' />
            </div>
        </div>
    )
}

export default BoardCard