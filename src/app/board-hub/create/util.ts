import { getServerSession } from "next-auth"

interface BoardObj {
    columns: {
        colTitle: string,
        cards:
        {
            question: string,
            answer: string,
            img: string,
            value: number
        }[]
    }[]
}
export interface GameObj {
    gameInfo: {
        [key: string | number]: any,
        author: string,
        lastModified: string,
        title: string,
        boards: BoardObj[],
        _id: string,
    }
}

export const getBoardInfo = async (id: String) => {
    const res = await fetch('http://localhost:3000/api/board/' + id, {
        method: 'GET',
        credentials: 'include',
    })
    if (res.status === 404) {
        return { board: undefined }
    }
    return await res.json();
}
export const updateBoardInDB = async ({ gameInfo }: GameObj) => {
    const res = await fetch('/api/board/' + gameInfo._id, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(gameInfo),
    });
    return await res.json();
}
export const createNewBoard = async (id: string): Promise<BoardObj> => {
    // const session = await getServerSession();
    const res = await fetch('/api/board/' + id, {
        method: 'POST',
        body: JSON.stringify({
            // name: session?.user?.name
        })
    })
    return await res.json()
}

const binarySearch = (cb: (idx: number) => number, length: number, value: number) => {
    let low = 0;
    let high = length;
    while (low < high) {
        let mid = (low + high) >> 1;
        if (cb(mid) < value) low = mid + 1
        else high = mid;
    }
    return low;
}

const defaultBoard = {
    columns: [
        {
            colTitle: 'This one has a really long title for reason, what happens?',
            cards: [
                { answer: '0,0', question: 'text here idk', img: 'some src', value: 100 },
                { answer: '0,1', question: 'text here idk', img: 'some src', value: 200 },
                { answer: '0,22', question: 'text here idk', img: 'some src', value: 400 },
                { answer: '0,3', question: 'text here idk', img: 'some src', value: 800 },
                { answer: '0,4', question: 'text here idk', img: 'some src', value: 1000 },
            ]
        },
        {
            colTitle: 'Title 2',
            cards: [
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 100 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 200 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 400 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 800 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 1000 },
            ]
        },
        {
            colTitle: 'This is something for the thingy',
            cards: [
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 100 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 200 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 400 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 800 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 1000 },
            ]
        },
        {
            colTitle: 'This is another title',
            cards: [
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 100 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 200 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 400 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 800 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 1000 },
            ]
        },
        {
            colTitle: 'XBOX XBOX XBOX XBOX XBOX XBOX XBOX XBOX ',
            cards: [
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 100 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 200 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 400 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 800 },
                { answer: 'some more text lol', question: 'text here idk', img: 'some src', value: 1000 },
            ]
        },
    ]
}

export { defaultBoard, binarySearch }
export type { BoardObj }