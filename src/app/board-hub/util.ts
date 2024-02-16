import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { options } from "../api/auth/[...nextauth]/options";
import gameData from "../models/GameData";
import { dbConnect } from "../../../db";

export const getUserCreatedBoards = async () => {
    await dbConnect();
    const session = await getServerSession(options);
    console.log(session)
    if (!session)
        return []
    const userGames = await gameData.find({ author: session?.user?.name }).limit(20);

    return JSON.parse(JSON.stringify(userGames));
}

export const createNewBoard = async () => {
    const res = await fetch('/api/boardCreate', {
        method: "POST",
        headers: headers(),
    })
}