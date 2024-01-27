import React from 'react'

type props = {
    children?: React.ReactNode,
    [key: string]: any
    cardInfo?: {
        question: string;
        answer: string;
        img: string;
        value: number;
    }
}

const BoardEntry = ({ children, cardInfo, ...rest }: props) => {
    return (
        <div className='flex items-center justify-center min-h-28 bg-third text-white text-lg border-2 border-background min-w-min font-bold hover:translate-y-1 hover:bg-opacity-95 hover:cursor-pointer' {...rest}>
            {children}
        </div>
    )
}

export default BoardEntry