import React, { useState } from 'react'
import TextAreaAutoSize from 'react-textarea-autosize'

const PlayerCard = ({ awardedPoints, ...props }: { awardedPoints: number }) => {
    const [playerPoints, setPlayerPoints] = useState(0)
    const addPoints = () => {
        console.log(awardedPoints)
        setPlayerPoints(playerPoints + awardedPoints)
    }
    const removePoints = () => {
        setPlayerPoints(playerPoints - awardedPoints)
    }
    return (
        <div className='w-max gap-y-3 flex flex-col items-center bg-third text-white rounded-md p-4' {...props}>
            <h1 className='text-2xl text-center font-medium'>
                <TextAreaAutoSize className='bg-transparent w-full resize-none text-center' defaultValue='Player Name' maxLength={30} maxRows={3} />
            </h1>
            <span className='font-medium border-b-2 text-xl'>{playerPoints}</span>
            <div className='flex justify-around w-full text-lg'>
                <button className='bg-primary rounded-md min-w-8 text-center font-bold' onClick={removePoints}>-</button>
                <button className=' bg-secondary rounded-md min-w-8 text-center font-bold' onClick={addPoints}>+</button>
            </div>
        </div>
    )
}

export default PlayerCard