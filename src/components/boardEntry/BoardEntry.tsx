import React from 'react'

type props = {
    title: string | number,
    [key: string] : any
}

const BoardEntry = ({ title, ...rest }: props) => {
    return (
        <div className='p-6 bg-third text-white text-lg border-2 border-background min-w-min font-bold hover:translate-y-1 hover:bg-opacity-95 hover:cursor-pointer' {...rest}>
            <h1 className='text-center'>{title}</h1>
        </div>
    )
}

export default BoardEntry