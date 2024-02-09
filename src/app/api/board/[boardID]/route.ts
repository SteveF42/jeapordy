import gameData from "@/app/models/GameData";
import { dbConnect } from "../../../../../db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import board from "@/app/models/Board";
import { options } from "../../auth/[...nextauth]/options";

export async function GET(req: NextRequest, { params }: any) {
    await dbConnect()
    const query = await gameData.findById(params.boardID).populate('boards');
    if (!query)
        return Response.json({ msg: 'not found' }, { status: 404 })

    return Response.json({ board: query })
}

export async function POST(req: NextRequest, { params }: any) {
    await dbConnect()
    const session = await getServerSession(options);
    const currentGame = await gameData.findById(params.boardID)
    if (!session || currentGame.author != session?.user?.name) {
        return new Response("unauthorized", { status: 401 })
    }
    const newBoard = new board();
    revalidatePath('/board-hub/create')
    return Response.json(newBoard, { status: 201 })
}

export async function DELETE(req: NextRequest, { params }: any) {
    await dbConnect();
    const boardId = params.boardId;
    const session = await getServerSession();
    const body = await req.json();
    if (!session || session.user?.name !== body.author) {
        return new Response("Unauthorized", { status: 401 })
    }

    const deleteRes = await board.findByIdAndDelete(body?.boardID);
    return new Response("board deleted", { status: 200 });
}

export async function PATCH(req: NextRequest, { params }: any) {
    await dbConnect();
    const boardId = params.boardID;
    const body = await req.json();
    const session = await getServerSession();

    if (!session || session.user?.name !== body.author) {
        return new Response("Unauthorized", { status: 401 })
    }
    body.boards.forEach(async (x: any) => {
        const boardRes = await board.findByIdAndUpdate(x._id, { ...x });
        if (!boardRes) {
            const bo = await board.create({ ...x });
            body.boards.push(bo);
        }
    })
    console.log(body)
    const res = await gameData.findByIdAndUpdate(boardId, {
        title: body.title,
        boards: body.boards,
        lastModified: Date.now()
    });
    revalidatePath('/board-hub/create')
    return Response.json(res)
}