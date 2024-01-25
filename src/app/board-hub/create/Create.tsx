"use client"

import BoardEntry from '@/components/boardEntry/BoardEntry'
import React, { useEffect, useRef, useState } from 'react'
import { defaultBoard } from './util'
import { PrimaryButton } from '@/components/Buttons'
import './Create.css'
import { BsDash, BsPatchMinus, BsPlus } from 'react-icons/bs'

const Create = () => {
    const [cols, setCols] = useState<number>(5)
    const [cards, setCards] = useState<React.ReactNode[]>([])
    const [numOfBoards, setnumOfBoards] = useState<number>(2)

    useEffect(() => {

        const col = []
        let i = 0
        for (let [_, topic] of Object.entries(defaultBoard)) {
            col.push(
                <div className='flex flex-col' key={i}>
                    {Object.entries(topic).map(([key, val], idx) => <BoardEntry style={key === 'topic' ? { 'flexGrow': 1 } : {}} title={key === 'topic' ? topic[key] : topic[key as keyof typeof val]['value']} key={idx}></BoardEntry>)
                    }
                </div >
            )
            i += 1
        }
        setCards(col);
        console.log(col);
    }, [])

    const editCard = () => {

    }
    const removeBoard = () => {
        if (numOfBoards > 0) {
            setnumOfBoards(numOfBoards - 1)
        }
    }
    const addBoard = () => {
        if (numOfBoards < 3) {
            setnumOfBoards(numOfBoards + 1)
        }
    }

    const displayBoards = () => {
        const elems = []
        for (let i = 0; i < numOfBoards; i++) {
            elems.push(
                <button type="button" className="button-group border-t border-b" id={'board-' + i} key={i}>
                    Board {i + 1}
                </button>
            )
        }
        return elems
    }

    return (
        <div className='p-12 flex flex-col items-center sm:block transition-all duration-100'>
            <div className='flex flex-col items-center gap-y-8'>
                <h1 className='text-3xl font-bold'>TITLE</h1>
                <div className='flex gap-8 flex-wrap justify-center'>
                    <PrimaryButton>Save?</PrimaryButton>
                    <div className="inline-flex rounded-md shadow-sm" role="group">

                        <button type="button" className="button-group rounded-s-md" onClick={removeBoard}>
                            <BsDash className='text-lg' />
                        </button>
                        {displayBoards()}
                        <button type="button" className="button-group rounded-e-md" onClick={addBoard}>
                            <BsPlus className='text-lg' />
                        </button>
                    </div>

                </div>
            </div>
            <div className='relative'>
                <div className='absolute w-full h-full mx-auto bg-third z-10 text-white opacity-95 invisible'> yup cock</div>
                <div className={`grid grid-cols-${cols} p-4 max-w-screen-xl min-w-[600px] scale-50 sm:mx-auto sm:scale-100 transition`}>
                    {cards}
                </div>
            </div>
        </div>
    )
}

export default Create