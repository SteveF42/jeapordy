import { BoardObj, GameObj } from '@/app/board-hub/create/util'
import BoardEntry from '@/components/boardEntry/BoardEntry'
import React from 'react'

const Board = ({ currentBoard }: { currentBoard: BoardObj }) => {
    return (
        <>
            {currentBoard.columns.map((val: any, idx: number) =>
                <div key={idx}>
                    <BoardEntry>
                        <h1>{val.colTitle}</h1>
                    </BoardEntry>
                    {val.cards.map((card: any, idx: number) => <BoardEntry key={idx}>{card.value}</BoardEntry>)}
                </div>
            )}
        </>
    )
}

export default Board