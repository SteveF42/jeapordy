"use client"

import BoardEntry from '@/components/boardEntry/BoardEntry'
import React, { useEffect, useRef, useState } from 'react'
import { defaultBoard } from './util'
import { PrimaryButton } from '@/components/Buttons'


const Create = () => {
    const [cols, setCols] = useState(5)
    const [cards, setCards] = useState<React.ReactNode[]>([])

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

    return (
        <div className='p-12 flex justify-center sm:block transition-all duration-100'>
            <div>
                <h1>TITLE</h1>
                <PrimaryButton>Save?</PrimaryButton>
            </div>
            <div className={`grid grid-cols-5 p-4 max-w-screen-xl mx-auto min-w-[630px] scale-50 sm:scale-100 transition`}>
                {cards}
            </div>
        </div>
    )
}

export default Create