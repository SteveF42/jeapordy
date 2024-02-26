import React, { useEffect, useState } from 'react'

type props = {
    isVisible: boolean,
    setIsVisible: (arg: boolean) => void,
    deleteBoard: () => void,
    elementRef: any
}

const ConfirmDelete = ({ isVisible, setIsVisible, deleteBoard, elementRef }: props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    useEffect(() => {
        if (isVisible) {
            setIsDeleted(false)
        }
    }, [isVisible])
    
    const confirmDeletion = () => {
        setIsDeleted(true)
        setIsVisible(false)
        deleteBoard()
    }

    return (
        <div className={`fixed bg-slate-500 p-6 rounded-md text-white z-40 ${isVisible ? 'scale-100' : 'scale-0'} transition mx-auto z-50`} ref={elementRef}>
            <h1 className='text-center text-2xl font-bold'>DO YOU <span className='text-xs font-normal underline italic'>NOT</span> WANT TO DELETE?</h1>
            <div className='mt-4 mx-auto flex items-center justify-evenly'>
                <button className='bg-red-500 rounded-md p-4 text-lg font-bold min-w-[50%]' onClick={() => setIsVisible(false)}>YES</button>
                <button className='bg-green-500 rounded-md text-black font-medium text-[0.5rem] p-1 h-min disabled:bg-opacity-20' onClick={confirmDeletion} disabled={isDeleted}>NO</button>
            </div>
        </div>
    )
}

export default ConfirmDelete