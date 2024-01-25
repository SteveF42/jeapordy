"use client"

import BoardCard from '@/components/boardCard/BoardCard';
import { InputSecondary } from '@/components/Inputs';
import { MutableRefObject, useRef, useState } from 'react'
import { BsPlus, BsX } from 'react-icons/bs';
import useOutSideClick from '@/hooks/useOutsideClick'

const BoardHub = () => {
    //API call will populate this later on
    const [myBoards, setMyBoards] = useState([]);
    const overlayRef = useRef<any>(null)
    const { isVisible: showOverlay, setIsVisible: setShowOverlay } = useOutSideClick(overlayRef);
    const tempBoard = {
        title: 'skibiddy toilet',
        date: '02/28/2024'
    }

    return (
        <>
            <div className={`${showOverlay ? "visible" : "invisible"} absolute flex flex-col z-10 mx-auto justify-center w-full h-2/3 items-center`}>
                <div className='flex relative flex-col gap-y-4 opacity-95 bg-gray-700 p-8 rounded-md text-white max-w-sm min-w-[20rem]' ref={overlayRef}>
                    <div className='absolute right-4 top-4 rounded-full hover:bg-slate-950 hover:cursor-pointer p-1'>
                        <BsX onClick={() => setShowOverlay(false)} />
                    </div>
                    <h1 className='text-2xl'>Create New Board</h1>
                    <InputSecondary placeholder="Title"></InputSecondary>
                    <button className='bg-secondary p-2 flex flex-row items-center gap-1 rounded-md hover:bg-third text-white font-semibold mb-2'>Create</button>
                </div>
            </div>
            <div className='board-hub p-10 max-w-screen-2xl mx-auto'>
                <button className='bg-secondary p-2 flex flex-row items-center gap-1 rounded-md hover:bg-third text-white font-semibold mb-2' onClick={() => setShowOverlay(!showOverlay)}>New Board <BsPlus /></button>
                <div className='flex gap-2 flex-wrap justify-evenly'>
                    {/* temporary stuff that'll be populated later */}
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                    <BoardCard board={tempBoard} />
                </div>
            </div>
        </>
    )

}
export default BoardHub