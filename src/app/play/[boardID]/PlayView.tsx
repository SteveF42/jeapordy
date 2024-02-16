import React from 'react'
import Game from './Game'
import { dbConnect } from '../../../../db'
import gameData from '@/app/models/GameData'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PlayView = async ({ params }: { params: { boardID: string } }) => {
    const getBoardInfo = async () => {
        await dbConnect();
        const query = await gameData.findById(params.boardID).populate('boards');
        if (!query)
            return { board: undefined }

        return { board: JSON.parse(JSON.stringify(query)) }
    }

    const boardData = await getBoardInfo();
    return (
        <div className=''>
            <Game gameInfo={boardData.board}></Game>
        </div>
    )
}

export default PlayView