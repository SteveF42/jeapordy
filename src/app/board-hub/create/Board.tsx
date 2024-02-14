"use client"
import React, { useEffect, useRef, useState } from 'react'
import { defaultBoard, BoardObj, binarySearch, GameObj, updateBoardInDB, createNewBoard, deleteBoardInDB } from './util'
import { BoardButton, PrimaryButton } from '@/components/Buttons'
import './Create.css'
import { BsCheck, BsDash, BsPlus } from 'react-icons/bs'
import Column from './Column'
import { InputSecondary } from '@/components/Inputs'
import useOutsideClick from '@/hooks/useOutsideClick'
import SettingsOverlay from './SettingsOverlay'
import { useRouter } from 'next/navigation'

var timeoutID: NodeJS.Timeout;
const Board = ({ gameInfo }: GameObj) => {
    const MAXCOL = 9;
    const [cols, setCols] = useState<number>(gameInfo.boards[0].columns.length);
    const [boardInfo, setBoardInfo] = useState<BoardObj>(gameInfo.boards[0]);
    const [boardArr, setBoardArr] = useState<BoardObj[]>([...gameInfo.boards]);
    const [numOfBoards, setnumOfBoards] = useState<number>(gameInfo.boards.length);
    const [boardTitle, setBoardTitle] = useState(gameInfo.title)
    const [isSaving, setIsSaving] = useState(false)
    const [saved, setSaved] = useState(false);
    const [cardIdx, setCardIdx] = useState([0, 0]) //[row, col]
    const settingsOverlayRef = useRef(null)
    const router = useRouter()
    const { isVisible: displayCardSettings, setIsVisible: setDisplayCardSettings } = useOutsideClick(settingsOverlayRef);

    const saveTimer = () => {
        clearTimeout(timeoutID);
        setIsSaving(true);
        setSaved(false);
        timeoutID = setTimeout(() => {
            saveBoard()
        }, 1000);
    }

    const removeBoard = async () => {
        if (numOfBoards > 1) {
            setnumOfBoards(numOfBoards - 1)
            const board = boardArr.pop()
            const res = await deleteBoardInDB({ gameInfo }, board?._id as string);
            setBoardArr([...boardArr])
            setIsSaving(true);
            setSaved(true);
            setTimeout(() => {
                setIsSaving(false);
            }, 1000);

        }
    }
    const addBoard = async () => {
        if (numOfBoards < 4) {
            setnumOfBoards(numOfBoards + 1)
            const newBoard = await createNewBoard(gameInfo._id);
            setBoardArr([...boardArr, newBoard])
            setBoardInfo(newBoard)
            setIsSaving(true);
            setSaved(true);
            setTimeout(() => {
                setIsSaving(false)

            }, 1000);
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
            saveTimer()
        }
    }
    const removeRow = (idx: number) => {
        return (e: React.MouseEvent) => {
            const newBoard: BoardObj = { ...boardInfo };
            newBoard.columns.forEach(x => x.cards.splice(idx, 1))
            setBoardInfo(newBoard);
            saveTimer()
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
            saveTimer();
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
            saveTimer()
        }
    }
    const changeTitle = (colIdx: number) => {
        return (e: React.FormEvent<HTMLTextAreaElement>) => {
            const text = e.currentTarget.value;
            boardInfo.columns[colIdx].colTitle = text;
            setBoardInfo({ ...boardInfo });
            saveTimer()
        }
    }
    const changeBoardTitle = (e: React.FormEvent<HTMLInputElement>) => {
        setBoardTitle(e.currentTarget.value)
        gameInfo.title = e.currentTarget.value;
        saveTimer();
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
    const saveBoard = async () => {
        gameInfo.boards = [...boardArr];
        const res = await updateBoardInDB({ gameInfo });
        router.refresh()
        if (res.ok) {
            console.log(res)
            setSaved(true);
            setIsSaving(true);
            setTimeout(() => {
                setIsSaving(false)
            }, 1000)
        }
    }

    return (
        <>
            <div className={`justify-between flex position absolute left-16 p-3 bg-green-400 rounded-md outline outline-2 outline-green-600 translate-y-[2rem] transition duration-150 ${isSaving ? 'scale-100' : 'scale-0'}`}>
                <span className='text-center'>{!saved ? 'saving...' : 'saved!'}</span>
                {saved &&
                    <BsCheck className='self-center'></BsCheck>
                }
            </div>
            <div className='flex flex-col items-center gap-y-8 mb-8 pt-8'>
                <h1 className='text-3xl font-bold'>
                    <input type="text" value={boardTitle} onChange={changeBoardTitle} className='text-center autosave bg-transparent' maxLength={23} />
                </h1>
                <div className='flex gap-8 flex-wrap justify-center'>
                    <div className="inline-flex rounded-md shadow-sm" role="group">
                        <BoardButton type="button" className="button-group rounded-s-md" onClick={removeBoard}>
                            <BsDash className='text-lg' />
                        </BoardButton>
                        {displayBoards()}
                        <button type="button" className="button-group rounded-e-md" onClick={addBoard}>
                            <BsPlus className='text-lg' />
                        </button>
                    </div>
                </div>
            </div>
            <div className='relative' ref={settingsOverlayRef}>
                <div className={`absolute h-full text-white p-8 rounded-md z-20 bg-third w-full ${displayCardSettings ? 'scale-100' : 'scale-0'} opacity-95 transition duration-100`}>
                    <SettingsOverlay boardInfo={boardInfo} cardIdx={cardIdx} updateDisplay={updateDisplay} setBoardInfo={setBoardInfo} saveBoard={saveBoard} />
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