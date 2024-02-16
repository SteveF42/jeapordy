import React from 'react'
import Board from './Board'
import { redirect } from 'next/navigation';
import { getBoardInfo } from '@/app/play/[boardID]/util';

const page = async ({ searchParams }: any) => {
    const boardId = searchParams?.id;
    if (boardId === null) {
        redirect('/');
    }
    const gameInfo = await getBoardInfo(boardId);
    if (!gameInfo.board) {
        redirect('/board-hub')
    }

    return (
        <Board gameInfo={gameInfo.board} />
    )
}

export default page