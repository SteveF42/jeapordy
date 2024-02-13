"use client"
import { GameObj } from '@/app/board-hub/create/util'
import PlayerCard from '@/components/PlayerCard'
import BoardEntry from '@/components/boardEntry/BoardEntry'
import React, { useState } from 'react'
import Board from './Board'


const Game = ({ gameInfo }: GameObj) => {
    const [currentBoard, setCurrentBoard] = useState(0);

    return (
        <>
            <h1 className='text-center text-2xl font-bold mb-4'>{gameInfo.title}</h1>
            <div className='board grid p-4 mx-auto min-w-[900px] scale-75 sm:mx-auto sm:scale-100 transition' style={{ gridTemplateColumns: `repeat(${gameInfo.boards[currentBoard].columns.length}, minmax(0, 1fr))` }}>
                <Board currentBoard={gameInfo.boards[currentBoard]} />
            </div>
            <div className='flex justify-evenly flex-wrap gap-y-2'>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
            </div>

        </>
    )
}

export default Game