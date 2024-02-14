"use client"
import { GameObj } from '@/app/board-hub/create/util'
import PlayerCard from '@/components/PlayerCard'
import BoardEntry from '@/components/boardEntry/BoardEntry'
import React, { useState } from 'react'
import Board from './Board'

export const dynamic = 'force-dynamic'

const Game = ({ gameInfo }: GameObj) => {
    const [currentBoard, setCurrentBoard] = useState(0);
    const [currentSquare, setCurrentSquare] = useState([0, 0]) //row, col


    const onCardClick = (row: number, col: number) => {
        return (e: React.MouseEvent) => {
            console.log(row,col)
        }
    }

    return (
        <div className='relative'>
            <div className='min-h-[500px] absolute'> hkljsfdajhksdfajhkasfdhjlk</div>
            <h1 className='text-center text-2xl font-bold mb-4'>{gameInfo.title}</h1>
            <div className='board grid p-4 mx-auto min-w-[900px] scale-75 sm:mx-auto sm:scale-100 transition' style={{ gridTemplateColumns: `repeat(${gameInfo.boards[currentBoard].columns.length}, minmax(0, 1fr))` }}>
                <Board currentBoard={gameInfo.boards[currentBoard]} onCardClick={onCardClick}/>
            </div>
            <div className='flex justify-evenly flex-wrap gap-y-2'>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
                <PlayerCard></PlayerCard>
            </div>

        </div>
    )
}

export default Game