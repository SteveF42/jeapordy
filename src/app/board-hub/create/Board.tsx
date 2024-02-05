"use client"
import React, { useEffect, useRef, useState } from 'react'
import { defaultBoard, BoardObj, binarySearch } from './util'
import { PrimaryButton } from '@/components/Buttons'
import './Create.css'
import { BsDash, BsPlus } from 'react-icons/bs'
import Column from './Column'
import { InputSecondary } from '@/components/Inputs'
import useOutsideClick from '@/hooks/useOutsideClick'
import SettingsOverlay from './SettingsOverlay'

type GameObj = {
    gameInfo: {
        [key: string | number]: any,
        author: string,
        lastModified: string,
        title: string,
        boards: [BoardObj],
        _id: string,
    }
}

const Board = ({ gameInfo }: GameObj) => {
    const MAXCOL = 9;
    const [cols, setCols] = useState<number>(5);
    const [boardInfo, setBoardInfo] = useState<BoardObj>(gameInfo.boards[0]);
    const [boardArr, setBoardArr] = useState<BoardObj[]>([...gameInfo.boards]);
    const [numOfBoards, setnumOfBoards] = useState<number>(gameInfo.boards.length);
    const [cardIdx, setCardIdx] = useState([0, 0]) //[row, col]
    const settingsOverlayRef = useRef(null)
    const { isVisible: displayCardSettings, setIsVisible: setDisplayCardSettings } = useOutsideClick(settingsOverlayRef);
    const removeBoard = () => {
        if (numOfBoards > 1) {
            setnumOfBoards(numOfBoards - 1)
            boardArr.pop()
            setBoardArr([...boardArr])
        }
    }
    const addBoard = () => {
        if (numOfBoards < 3) {
            setnumOfBoards(numOfBoards + 1)
            const newBoard = JSON.parse(JSON.stringify(defaultBoard));
            setBoardArr([...boardArr, newBoard])
            setBoardInfo(newBoard)
        }
    }
    const changeBoard = (idx: number) => {
        return (e: React.FormEvent<HTMLButtonElement>) => {
            const length = boardArr[idx].columns.length
            setBoardInfo(boardArr[idx])
            setCols(length);
        }
    }

    const displayBoards = () => {
        const elems = []
        for (let i = 0; i < numOfBoards; i++) {
            elems.push(
                <button type="button" className="button-group border-t border-b" id={'board-' + i} key={i} onClick={changeBoard(i)}>
                    Board {i + 1}
                </button>
            )
        }
        return elems
    }

    const removeCol = (idx: number) => {
        return (e: React.MouseEvent) => {
            const newBoard: BoardObj = boardInfo
            let i = 0;
            newBoard.columns = boardInfo.columns.filter((_, i) => i != idx);
            setBoardInfo(newBoard);
            setCols(cols - 1);
        }
    }
    const removeRow = (idx: number) => {
        return (e: React.MouseEvent) => {
            const newBoard: BoardObj = { ...boardInfo };
            newBoard.columns.forEach(x => x.cards.splice(idx, 1))
            setBoardInfo(newBoard);
        }
    }
    const addCol = () => {
        return (e: React.MouseEvent) => {
            if (cols >= MAXCOL) return;
            const newBoard: BoardObj = boardInfo
            if (boardInfo.columns.length === 0) {
                newBoard.columns[cols] = JSON.parse(JSON.stringify(defaultBoard.columns[0]));
            } else {
                newBoard.columns[cols] = JSON.parse(JSON.stringify(boardInfo.columns[0]));
            }
            newBoard.columns[cols].colTitle = "New Topic"
            setBoardInfo(newBoard);
            setCols(cols + 1)
        }
    }
    const addRow = () => {
        return (e: React.MouseEvent) => {
            const newBoard: BoardObj = { ...boardInfo }
            newBoard.columns.forEach(x => {
                let length: number = x.cards.length;
                const newEntry = JSON.parse(JSON.stringify(defaultBoard.columns[0].cards[0]));
                const idxToInsert = binarySearch((idx: number) => x.cards[idx].value, length, newEntry.value)
                x.cards.splice(idxToInsert, 0, newEntry);
            })
            setBoardInfo(newBoard);
        }
    }
    const changeTitle = (colIdx: number) => {
        return (e: React.FormEvent<HTMLTextAreaElement>) => {
            const text = e.currentTarget.value;
            boardInfo.columns[colIdx].colTitle = text;
            setBoardInfo({ ...boardInfo });
        }
    }
    const displayCard = (col: number, row: number) => {
        return (e: React.MouseEvent) => {
            setCardIdx([col, row])
            setDisplayCardSettings(!displayCardSettings)
        }
    }
    const updateDisplay = () => {
        setDisplayCardSettings(!displayCardSettings)
    }


    return (
        <>
            <div className='flex flex-col items-center gap-y-8 mb-8'>
                <h1 className='text-3xl font-bold'>
                    <input type="text" defaultValue={gameInfo.title} className='text-center bg-transparent' maxLength={23} />
                </h1>
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
            <div className='relative' ref={settingsOverlayRef}>
                <div className={`absolute text-white p-8 rounded-md z-20 bg-third w-full h-full ${displayCardSettings ? 'scale-100' : 'scale-0'} opacity-95 transition duration-100`}>
                    <SettingsOverlay boardInfo={boardInfo} cardIdx={cardIdx} updateDisplay={updateDisplay} setBoardInfo={setBoardInfo} />
                </div>
                <div className='flex justify-center gap-4'>
                    <button className='button-group rounded-md' onClick={addCol()}>Add Col +</button>
                    <button className='button-group rounded-md' onClick={addRow()}>Add Row +</button>
                </div>
                <div className={`grid p-4 mx-auto min-w-[900px] scale-75 sm:mx-auto sm:scale-100 transition`} style={{ gridTemplateColumns: `repeat(${boardInfo.columns.length}, minmax(0, 1fr))` }}>
                    {Object.entries(boardInfo.columns).map(([key, val]: any) =>
                        <Column
                            id={Number.parseInt(key)}
                            removeCol={removeCol}
                            colInfo={val}
                            isEndCol={(cols - 1).toString() === key}
                            key={key}
                            updateCard={displayCard}
                            removeRow={removeRow}
                            changeTitle={changeTitle} />
                    )}
                </div>
            </div >
        </>
    )
}

export default Board