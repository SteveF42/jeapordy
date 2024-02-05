import gameData from "@/app/models/GameData";
import { dbConnect } from "../../../../../db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
    await dbConnect()
    const query = await gameData.findById(params.boardID).populate('boards');
    if (!query)
        return Response.json({ msg: 'not found' }, { status: 404 })

    return Response.json({ board: query })
}