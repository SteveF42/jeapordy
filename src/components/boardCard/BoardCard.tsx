import useOutsideClick from '@/hooks/useOutsideClick';
import { useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react'

import { BsFillTrash3Fill, BsPencilSquare, BsPlay, BsPlayBtnFill, BsPlayFill } from "react-icons/bs";
type props = {
    board: any
}
const BoardCard = ({ board }: props) => {
    const router = useRouter();
    const ref = useRef(null)
    const [invisible, setInvisible] = useState(false)
    const { isVisible, setIsVisible } = useOutsideClick(ref)

    const formatDate = (input: string) => {
        const date = new Date(input);
        const s = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        return s
    }
    const editBoard = () => {
        router.push(`/board-hub/create?id=${board?._id}`)
    }
    const deleteBoard = async () => {
        const res = await fetch('/api/boardCreate', {
            method: 'DELETE',
            credentials: 'include',
            body: JSON.stringify(board)
        })
        if (res.ok) {
            setInvisible(true)
            setIsVisible(false)
        }
    }
    const playBoard = (e: React.FormEvent<HTMLDivElement>) => {
        e.preventDefault();
        router.push('/play/' + board?._id);
    }

    return (
        <>
            <div className={`fixed bg-slate-500 p-6 rounded-md text-white z-20 ${isVisible ? 'scale-100' : 'scale-0'} transition`} ref={ref}>
                <h1 className='text-center text-2xl font-bold'>DO YOU NOT WANT TO DELETE?</h1>
                <div className='mt-4 mx-auto flex items-center justify-evenly'>
                    <button className='bg-red-500 rounded-md p-4 text-lg font-bold min-w-[50%]' onClick={()=>setIsVisible(false)}>YES</button>
                    <button className='bg-green-500 rounded-md text-black font-medium text-[0.5rem] p-1 h-min' onClick={deleteBoard}>NO</button>
                </div>
            </div>
            <div className={`${invisible && 'hidden'} board-card flex-grow bg-third rounded-md text-gray-50 p-4 min-w-48 max-w-fit gap-x-4 flex flex-row justify-around border-2 border-primary hover:translate-x-0.5 hover:-translate-y-0.5`}>
                <div className='info'>
                    <div className='flex items-center justify-around hover:cursor-pointer' onClick={playBoard}>
                        <BsPlayFill className='text-2xl'></BsPlayFill>
                        <h1 className='text-xl mb-1'>{board?.title}</h1>
                    </div>
                    <h2 className='text-base'>last edited: {formatDate(board?.lastModified)}</h2>
                </div>
                <div className='options flex items-center flex-col justify-between'>
                    <BsFillTrash3Fill className='hover:cursor-pointer hover:scale-125' onClick={() => setIsVisible(true)} />
                    <BsPencilSquare className='hover:cursor-pointer hover:scale-125' onClick={editBoard} />
                </div>
            </div>
        </>
    )
}

export default BoardCard