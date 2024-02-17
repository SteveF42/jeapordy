import { BoardObj, GameObj } from '@/app/board-hub/create/util'
import BoardEntry from '@/components/boardEntry/BoardEntry'
import React, { useState } from 'react'

const Board = ({ currentBoard, onCardClick }: { currentBoard: BoardObj, onCardClick: (row: number, col: number) => void }) => {
    const [clickedSet, setClickedSet] = useState(new Map<string, Set<string>>([['', new Set<string>()]])); //WTF IS THIS?!!??!?

    const clickedBoard = (row: number, col: number) => {
        clickedSet.set(`${row},${col}`, new Set());
        return (e: any) => {
            e.preventDefault();
            const currSet = clickedSet.get(currentBoard._id);
            //adds or removes the card from the set depending on left or right click
            if (!clickedSet.get(currentBoard._id)?.has(`${row},${col}`) && e.type === 'click') {
                setClickedSet(new Map(clickedSet.set(currentBoard._id, new Set(currSet).add(`${row},${col}`))));
                onCardClick(row, col);
            } else if (e.type === 'contextmenu' && currSet?.delete(`${row},${col}`)) {
                setClickedSet(new Map(clickedSet.set(currentBoard._id, new Set(currSet))));
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
                    {val.cards.map((card: any, row: number) => <BoardEntry key={row} onContextMenu={clickedBoard(row, col)} onClick={clickedBoard(row, col)}>{!clickedSet.get(currentBoard._id)?.has(`${row},${col}`) && card.value}</BoardEntry>)}
                </div>
            )}
        </>
    )
}

export default Board