
import { BsDash, BsPlus } from 'react-icons/bs'
import BoardEntry from '@/components/boardEntry/BoardEntry'
import { BoardObj } from './util'
import { useRef, useState } from 'react'
import { PrimaryButton } from '@/components/Buttons'
import useOutsideClick from '@/hooks/useOutsideClick'
import ConfirmDelete from '@/components/boardCard/ConfirmDelete'


type rowProps = {
    removeRow: any,
    isEndCol: boolean,
    val: any,
    updateCard: (col: number, row: number) => void,
    idx: number,
    id: number
}

const Row = ({ removeRow, isEndCol, val, updateCard, idx, id }: rowProps) => {
    const rowRef = useRef(null)
    const { isVisible: rowVisible, setIsVisible: setRowVisible } = useOutsideClick(rowRef)
    return (
        <div className={`relative group/second`}>
            <ConfirmDelete isVisible={rowVisible} setIsVisible={setRowVisible} deleteBoard={removeRow(idx)} elementRef={rowRef} />
            {isEndCol &&
                <div onClick={() => setRowVisible(true)} className='z-10 absolute right-0 top-[50%] translate-y-[-50%] font-medium text-2xl bg-red-500 rounded-full mx-auto p-1 hover:cursor-pointer scale-0 group-hover/second:scale-100 hover:bg-red-700 group/inner'>
                    <BsDash />
                    <span className='text-base text-white bg-primary rounded-md p-1 absolute w-auto min-w-max font-bold top-0 translate-x-[-110%] scale-0 group-hover/inner:scale-100 text-center'>
                        Remove Row
                    </span>
                </div>
            }
            <BoardEntry style={{ height: '100%' }} key={idx} cardInfo={val} onClick={updateCard(idx, id)}>{val.value}</BoardEntry>
        </div>
    )
}

type props = {
    colInfo: any,
    id: number,
    removeCol: any,
    removeRow: any,
    updateCard: (col: number, row: number) => void,
    isEndCol: boolean,
    changeTitle: any,
}

const Column = ({ colInfo, id, removeCol, removeRow, updateCard, isEndCol, changeTitle }: props) => {
    // I KNOW THIS IS REALLY MESSY BUT ITS JUST HOW IT HAS TO WORK LEAVE ME ALONE :(
    const colRef = useRef(null)
    const { isVisible, setIsVisible } = useOutsideClick(colRef)

    const captureKey = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    return (
        <div id={`${id}`} className='flex flex-col transition group/main'>
            <div className='flex justify-center'>
                <ConfirmDelete isVisible={isVisible} setIsVisible={setIsVisible} deleteBoard={removeCol(id)} elementRef={colRef} />
            </div>
            <div onClick={() => setIsVisible(true)} className='mb-1 relative font-medium text-2xl bg-red-500 rounded-full mx-auto p-1 hover:cursor-pointer scale-0 group-hover/main:scale-100 hover:bg-red-700 group'>
                <BsDash />
                <span className='text-base text-white bg-primary rounded-md p-1 absolute w-auto min-w-max font-bold -top-9 left-[50%] translate-x-[-50%] scale-0 group-hover:scale-100 text-center'>
                    Remove Column
                </span>
            </div>
            <BoardEntry style={{ height: '100%' }}>
                <textarea className='autosave bg-transparent h-full w-full resize-none text-center px-1.5 py-2.5 overflow-clip' maxLength={90} onChange={changeTitle(id)} key={id} value={colInfo?.colTitle} onKeyDownCapture={captureKey} title={colInfo?.colTitle}></textarea>
            </BoardEntry>
            {colInfo?.cards.map((val: any, idx: number) => {
                return <Row key={idx} removeRow={removeRow} isEndCol={isEndCol} val={val} updateCard={updateCard} idx={idx} id={id} />
            })}
        </div >
    )
}

export default Column;