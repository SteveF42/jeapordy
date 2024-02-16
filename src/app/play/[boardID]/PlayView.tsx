import React from 'react'
import Game from './Game'
import { getBoardInfo } from './util'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const PlayView = async ({ params }: { params: { boardID: string } }) => {

    const boardData = await getBoardInfo(params.boardID);
    return (
        <div className=''>
            <Game gameInfo={boardData.board}></Game>
        </div>
    )
}

export default PlayView