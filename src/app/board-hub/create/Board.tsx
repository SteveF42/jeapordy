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

const Board = () => {
    const MAXCOL = 9;
    const [cols, setCols] = useState<number>(5);
    const [boardInfo, setBoardInfo] = useState<BoardObj>(JSON.parse(JSON.stringify(defaultBoard)));
    const [boardArr, setBoardArr] = useState<BoardObj[]>([boardInfo, JSON.parse(JSON.stringify(defaultBoard))]);
    const [numOfBoards, setnumOfBoards] = useState<number>(2);
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
            setBoardArr([...boardArr, JSON.parse(JSON.stringify(defaultBoard))])
        }
    }
    const changeBoard = (idx: number) => {
        return (e: React.FormEvent<HTMLButtonElement>) => {
            const length = Object.keys(boardArr[idx]).length
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
            console.log(newBoard, idx)
            for (let [key, val] of Object.entries(boardInfo)) {

                delete newBoard[key]
                if (key !== idx.toString()) {
                    newBoard[i] = val;
                    i += 1;
                }
            }
            setBoardInfo(newBoard);
            setCols(cols - 1);
        }
    }
    const removeRow = (idx: number) => {
        return (e: React.MouseEvent) => {
            const newBoard: BoardObj = { ...boardInfo };
            for (let [key, colInfo] of Object.entries(newBoard)) {
                colInfo.board.splice(idx, 1);
            }
            setBoardInfo(newBoard);
        }
    }
    const addCol = () => {
        return (e: React.MouseEvent) => {
            if (cols >= MAXCOL) return;
            const newBoard: BoardObj = boardInfo
            if (boardInfo[0] === undefined) {
                newBoard[cols] = JSON.parse(JSON.stringify(defaultBoard[0]));
            } else {
                newBoard[cols] = JSON.parse(JSON.stringify(boardInfo[0]));
            }
            newBoard[cols].topic = "New Topic"
            setBoardInfo(newBoard);
            setCols(cols + 1)
        }
    }
    const addRow = () => {
        return (e: React.MouseEvent) => {
            const newBoard: BoardObj = { ...boardInfo }
            for (let [key, val] of Object.entries(newBoard)) {
                let length: number = Object.keys(val.board).length;
                const newEntry = defaultBoard[0].board[0];
                const idxToInsert = binarySearch((idx: number) => val.board[idx].value, length, newEntry.value)
                val.board.splice(idxToInsert, 0, newEntry);
            }
            setBoardInfo(newBoard);
        }
    }
    const changeTitle = (colIdx: number) => {
        return (e: React.FormEvent<HTMLTextAreaElement>) => {
            const text = e.currentTarget.value;
            boardInfo[colIdx].topic = text;
            setBoardInfo({ ...boardInfo });
        }
    }
    const displayCard = (col: number, row: number) => {
        return (e: React.MouseEvent) => {
            setCardIdx([col, row])
            setDisplayCardSettings(!displayCardSettings)
        }
    }
    const updateCardInfo = () => {
        return (e: React.MouseEvent) => {
            setDisplayCardSettings(!displayCardSettings)
        }
    }


    return (
        <>
            <div className='flex flex-col items-center gap-y-8 mb-8'>
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
            <div className='relative' ref={settingsOverlayRef}>
                <div className={`absolute text-white p-8 rounded-md z-20 bg-third w-full h-full ${displayCardSettings ? 'scale-100' : 'scale-0'} opacity-95 transition duration-100`}>
                    <SettingsOverlay boardInfo={boardInfo} cardIdx={cardIdx} updateCard={updateCardInfo} setBoardInfo={setBoardInfo} />
                </div>
                <div className='flex justify-center gap-4'>
                    <button className='button-group rounded-md' onClick={addCol()}>Add Col +</button>
                    <button className='button-group rounded-md' onClick={addRow()}>Add Row +</button>
                </div>
                <div className={`grid p-4 mx-auto min-w-[900px] scale-75 sm:mx-auto sm:scale-100 transition`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
                    {Object.entries(boardInfo).map(([key, val]) => <Column id={Number.parseInt(key)} removeCol={removeCol} colInfo={val} isEndCol={(cols - 1).toString() === key} key={key} updateCard={displayCard} removeRow={removeRow} changeTitle={changeTitle} />)}
                </div>
            </div >
        </>
    )
}

export default Board