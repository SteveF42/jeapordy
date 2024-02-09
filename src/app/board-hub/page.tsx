import React from 'react'
import BoardHub from './BoardHub'
import { getUserCreatedBoards } from './util'
import { getServerSession } from 'next-auth';

export const dynamic = "force-dynamic"
const page = async () => {
  const userData = await getUserCreatedBoards();

  return (
    <BoardHub userGames={userData.games}></BoardHub>
  )
}

export default page