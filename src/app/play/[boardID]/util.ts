import gameData from "@/app/models/GameData";
import { dbConnect } from "../../../../db";

export const getBoardInfo = async (boardID: string) => {
    await dbConnect();
    const query = await gameData.findById(boardID).populate('boards');
    if (!query)
        return { board: undefined }

    return { board: JSON.parse(JSON.stringify(query)) }
}
