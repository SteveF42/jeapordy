import React from 'react'
import TextAreaAutoSize from 'react-textarea-autosize'

const PlayerCard = (props: any) => {
    return (
        <div className='max-w-44 gap-y-3 flex flex-col items-center bg-third text-white rounded-md p-4' {...props}>
            <h1 className='text-lg text-center font-medium'>
                <TextAreaAutoSize className='bg-transparent w-full resize-none text-center' defaultValue='Player Name' maxLength={30} maxRows={3}/>
            </h1>
            <span className='font-medium border-b-2'>0</span>
            <div className='flex justify-around w-full text-lg'>
                <button className='bg-primary rounded-md min-w-8 text-center font-bold'>-</button>
                <button className=' bg-secondary rounded-md min-w-8 text-center font-bold'>+</button>
            </div>
        </div>
    )
}

export default PlayerCard