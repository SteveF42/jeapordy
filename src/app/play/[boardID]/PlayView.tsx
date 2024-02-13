import { getBoardInfo } from '@/app/board-hub/create/util'
import React from 'react'
import Game from './Game'

const PlayView = async ({ params }: { params: { boardID: string } }) => {
    const boardData = await getBoardInfo(params.boardID)

    return (
        <div className='p-6'>
            <Game gameInfo={boardData.board}></Game>
        </div>
    )
}

export default PlayView