import React from 'react'
import BoardHub from './BoardHub'
import { getUserCreatedBoards } from './util'
import { getServerSession } from 'next-auth';

export const dynamic = "force-dynamic"
const page = async () => {
  const userGames = await getUserCreatedBoards();

  return (
    <BoardHub userGames={userGames}></BoardHub>
  )
}

export default page