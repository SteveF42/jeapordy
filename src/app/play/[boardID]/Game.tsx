"use client"
import { GameObj } from '@/app/board-hub/create/util'
import PlayerCard from '@/components/PlayerCard'
import React, { useRef, useState } from 'react'
import Board from './Board'
import useOutsideClick from '@/hooks/useOutsideClick'
import { BsGearFill, BsX } from 'react-icons/bs'


const Game = ({ gameInfo }: GameObj) => {
    const [currentBoard, setCurrentBoard] = useState(0);
    const [currentSquare, setCurrentSquare] = useState([0, 0]) //row, col
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const settingsRef = useRef(null)
    const questionRef = useRef(null)
    const { isVisible: questionVisible, setIsVisible: setQuestionVisible } = useOutsideClick(questionRef)
    const { isVisible, setIsVisible } = useOutsideClick(settingsRef);
    const [showAnswer, setShowAnswer] = useState(false);
    const [pointsAwarded, setPointsAwarded] = useState(0);

    const onCardClick = (row: number, col: number) => {
        setQuestionVisible(true);
        setShowAnswer(false);
        setCurrentSquare([row, col])
    }

    const displayNumOfPlayers = () => {
        const elems = []
        for (let i = 0; i < numberOfPlayers; i++) {
            elems.push(
                <PlayerCard key={i} awardedPoints={pointsAwarded}></PlayerCard>
            )
        }
        return elems
    }
    const addPlayer = () => {
        if (numberOfPlayers < 6)
            setNumberOfPlayers(numberOfPlayers + 1)
    }
    const removePlayer = () => {
        if (numberOfPlayers > 0)
            setNumberOfPlayers(numberOfPlayers - 1)
    }
    const getCurrentSquare = () => {
        return gameInfo.boards[currentBoard].columns[currentSquare[1]].cards[currentSquare[0]]
    }

    const revealAnswer = () => {
        if (!showAnswer) {
            setShowAnswer(true);
        } else {
            setQuestionVisible(false);
            setPointsAwarded(getCurrentSquare()?.value);
        }
    }
    const nextBoard = () => {
        if (currentBoard < gameInfo.boards.length - 1) {
            setCurrentBoard(currentBoard + 1)
        }
    }
    const previosBoard = () => {
        if (currentBoard > 0) {
            setCurrentBoard(currentBoard - 1)
        }
    }
    return (
        <>
            <div className={`absolute w-full h-[90%] p-6 text-white z-20 ${questionVisible ? 'scale-100' : 'scale-0'} transition duration-100`}>
                <div className='bg-third w-full h-full rounded-md transition p-8 flex hover:cursor-pointer' ref={questionRef} onClick={revealAnswer}>
                    <h1 className='text-center text-6xl text-wrap w-[25ch] m-auto'>{!showAnswer ? getCurrentSquare()?.question : getCurrentSquare()?.answer}</h1>
                </div>
            </div>
            <div className={`relative p-6 ${questionVisible && 'hidden'} transition`}>
                <div className={`w-full absolute scale-0 ${isVisible && 'scale-100'} z-20 transition`}>
                    <div className='text-white text-center p-4 bg-slate-600 opacity-95 transition rounded-md w-1/2 max-w-screen-md mx-auto' ref={settingsRef}>
                        {/* <span className='absolute right-0 m-1 bg-slate-500 opacity-45'><BsX/></span> */}
                        <h1 className='text-2xl font-bold'>settings</h1>
                        <span>Invite Code: coming soon...</span>
                        <h1 className='text-lg font-bold'>custom score</h1>
                        <input className='text-black text-center rounded-md' type="number" value={pointsAwarded} onChange={(e: React.FormEvent<HTMLInputElement>) => setPointsAwarded(Number.parseInt(e.currentTarget.value))} />
                        <h1 className='text-lg font-bold'>Current Board</h1>
                        <div>
                            <button onClick={previosBoard}> {'<<'} </button>
                            <span className='mx-2'>{currentBoard + 1}</span>
                            <button onClick={nextBoard}>{'>>'}</button>
                        </div>
                        <div>
                            <h2 className='text-lg font-medium'>Number of players</h2>
                            <span className='text-2xl font-bold'>{numberOfPlayers}</span>
                            <div className='flex justify-center gap-6 text-white font-medium text-lg'>
                                <button className='bg-primary rounded-md min-w-8' onClick={removePlayer}>-</button>
                                <button className='bg-secondary rounded-md min-w-8' onClick={addPlayer}>+</button>
                            </div>
                        </div>
                    </div>
                </div>

                <span className='text-lg'>
                    <BsGearFill className='hover:scale-125 hover:rotate-45 transition hover:cursor-pointer' onClick={() => setIsVisible(true)} />
                </span>
                <h1 className='text-center text-4xl font-bold mb-4'>{gameInfo.title}</h1>
                <div className='board grid p-4 mx-auto min-w-[900px] scale-75 sm:mx-auto sm:scale-100 transition' style={{ gridTemplateColumns: `repeat(${gameInfo.boards[currentBoard].columns.length}, minmax(0, 1fr))` }}>
                    <Board currentBoard={gameInfo.boards[currentBoard]} onCardClick={onCardClick} />
                </div>
                <div className='flex justify-evenly flex-wrap gap-y-2'>
                    {displayNumOfPlayers()}
                </div>
            </div>
        </>
    )
}

export default Game