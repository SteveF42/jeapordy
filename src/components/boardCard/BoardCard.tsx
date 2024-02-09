import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

import { BsFillTrash3Fill, BsPencilSquare } from "react-icons/bs";
type props = {
    board: any
}
const BoardCard = ({ board }: props) => {
    const router = useRouter();
    const [invisible, setInvisible] = useState(false)

    const formatDate = (input: string) => {
        const date = new Date(input);
        const s = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`
        return s
    }
    const editBoard = () => {
        router.push(`/board-hub/create?id=${board?._id}`)
    }
    const deleteBoard = async () => {
        const res = await fetch('/api/boardCreate',{
            method:'DELETE',
            credentials:'include',
            body:JSON.stringify(board)
        })
        if(res.ok){
            setInvisible(true)
        }
    }
    return (
        <div className={`${invisible && 'hidden'} board-card flex-grow bg-third rounded-md text-gray-50 p-4 min-w-48 max-w-fit gap-x-4 flex flex-row justify-around border-2 border-primary hover:translate-x-0.5 hover:-translate-y-0.5`}>
            <div className='info'>
                <h1 className='text-xl mb-1'>{board?.title}</h1>
                <h2 className='text-base'>last edited: {formatDate(board?.lastModified)}</h2>
            </div>
            <div className='options flex items-center flex-col justify-between'>
                <BsFillTrash3Fill className='hover:cursor-pointer hover:scale-125' onClick={deleteBoard}/>
                <BsPencilSquare className='hover:cursor-pointer hover:scale-125' onClick={editBoard} />
            </div>
        </div>
    )
}

export default BoardCard