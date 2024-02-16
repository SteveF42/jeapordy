import { BoardObj, GameObj } from '@/app/board-hub/create/util'
import BoardEntry from '@/components/boardEntry/BoardEntry'
import React, { useState } from 'react'

const Board = ({ currentBoard, onCardClick }: { currentBoard: BoardObj, onCardClick: (row: number, col: number) => void }) => {
    const [clickedSet, setClickedSet] = useState(new Set());
    const clickedBoard = (row: number, col: number) => {
        return (e: any) => {
            e.preventDefault();
            if (!clickedSet.has(`${row},${col}`) && e.type === 'click') {
                setClickedSet(new Set(clickedSet.add(`${row},${col}`)));
                onCardClick(row, col);
            } else if (e.type === 'contextmenu' && clickedSet.delete(`${row},${col}`)) {
                setClickedSet(new Set(clickedSet));
            }
        }
    }

    return (
        <>
            {currentBoard.columns.map((val: any, col: number) =>
                <div key={col}>
                    <BoardEntry>
                        <h1 className='text-center'>{val.colTitle}</h1>
                    </BoardEntry>
                    {val.cards.map((card: any, row: number) => <BoardEntry key={row} onContextMenu={clickedBoard(row,col)} onClick={clickedBoard(row, col)}>{!clickedSet.has(`${row},${col}`) && card.value}</BoardEntry>)}
                </div>
            )}
        </>
    )
}

export default Board