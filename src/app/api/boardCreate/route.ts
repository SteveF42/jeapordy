import gameData from "@/app/models/GameData";
import { dbConnect } from "../../../../db";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/options";


export async function POST(req: Request) {
    await dbConnect();
    const session = await getServerSession();
    if (!session) {
        return new Response("Denied", { status: 401 })
    }

    const gameDetails = await req.json();
    const gameInfo = await new gameData({
        title: gameDetails?.title,
        author: session.user?.name
    })
    gameInfo.save();
    // const newBoard = await new board({});
    // console.log(newBoard)
    // gameInfo.save()
    return Response.json(gameInfo, { status: 201 })
}

export async function GET(req: Request) {
    await dbConnect();
    const session = await getServerSession(options);
    if (!session)
        return Response.json({ status: "Denied" }, { status: 401 });

    const userGames = await gameData.find({ author: session?.user?.name }).limit(20);
    return Response.json({
        games: userGames
    })
}