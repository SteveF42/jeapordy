import { BoardObj, GameObj } from '@/app/board-hub/create/util'
import BoardEntry from '@/components/boardEntry/BoardEntry'
import React from 'react'

const Board = ({ currentBoard, onCardClick }: { currentBoard: BoardObj, onCardClick: (row: number, col: number) => void }) => {
    return (
        <>
            {currentBoard.columns.map((val: any, col: number) =>
                <div key={col}>
                    <BoardEntry>
                        <h1>{val.colTitle}</h1>
                    </BoardEntry>
                    {val.cards.map((card: any, row: number) => <BoardEntry key={row} onClick={onCardClick(row, col)}>{card.value}</BoardEntry>)}
                </div>
            )}
        </>
    )
}

export default Board