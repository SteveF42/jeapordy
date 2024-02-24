import axios from "@/api/axios"
axios.defaults.baseURL = process.env.NEXTAUTH_URL

interface BoardObj {
    columns: {
        colTitle: string,
        cards:
        {
            question: string,
            answer: string,
            image: string,
            value: number
        }[]
    }[],
    _id: string
}
export interface GameObj {
    gameInfo: {
        [key: string | number]: any,
        author: string,
        lastModified: string,
        title: string,
        boards: BoardObj[],
        _id: string,
    },
}

export const uploadMedia = async (file: File, setUploadProgress: (prev?: any) => void) => {
    const payLoad = {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
    }

    const res = await axios.post('/api/media', payLoad, {
        headers: {
            'Content-Type': 'application/json'
        },
        onUploadProgress: (e: any) => {
            setUploadProgress((prev: any) => {
                return {
                    ...prev,
                    progress: (e?.progress * 100)
                }
            })
        }
    })

    const { putUrl, getUrl } = res.data;
    const uploadRes = await fetch(putUrl, {
        body: file,
        method: 'PUT',
        headers: {
            'Content-Type': file.type
        },
    })
    return { status: uploadRes.status, getUrl }
}

export const updateBoardInDB = async ({ gameInfo }: GameObj) => {
    const res = await fetch('/api/board/' + gameInfo._id, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(gameInfo),
    });
    return res;
}
export const deleteBoardInDB = async ({ gameInfo }: GameObj, boardID: string) => {
    const res = await fetch('/api/board/' + gameInfo._id, {
        method: "DELETE",
        credentials: 'include',
        body: JSON.stringify({
            author: gameInfo.author,
            boardID,
        }
        )
    })
}
export const createNewBoard = async (id: string): Promise<BoardObj> => {
    // const session = await getServerSession();
    const res = await fetch('/api/board/' + id, {
        method: 'POST',
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