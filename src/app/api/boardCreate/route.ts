import gameData from "@/app/models/GameData";
import { dbConnect } from "../../../../db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";


export async function POST(req: NextRequest) {
    const session = await getServerSession();
    if (!session) {
        return new Response("Denied", { status: 401 })
    }

    const gameDetails = await req.json();
    const gameInfo = await new gameData({
        title: gameDetails?.title || "Title",
        author: session.user?.name
    })
    gameInfo.save();
    revalidatePath('/board-hub')
    return Response.json(gameInfo, { status: 201 })
}

export async function GET(req: Request) {
    const session = await getServerSession(options);
    console.log(session)
    if (!session)
        return Response.json({ status: "Denied" }, { status: 401 });

    const userGames = await gameData.find({ author: session?.user?.name }).limit(20);
    return Response.json({
        games: userGames
    })
}