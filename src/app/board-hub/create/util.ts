interface BoardObj {
    [key: number | string]: {
        topic: string,
        board:
        {
            description: string,
            img: string,
            value: number
        }[]
    }
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
    0: {
        topic: 'This one has a really long title for reason, what happens?',
        board: [
            { description: 'text here idk', img: 'some src', value: 100 },
            { description: 'text here idk', img: 'some src', value: 200 },
            { description: 'text here idk', img: 'some src', value: 400 },
            { description: 'text here idk', img: 'some src', value: 800 },
            { description: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
    1: {
        topic: 'Title 2',
        board: [
            { description: 'text here idk', img: 'some src', value: 100 },
            { description: 'text here idk', img: 'some src', value: 200 },
            { description: 'text here idk', img: 'some src', value: 400 },
            { description: 'text here idk', img: 'some src', value: 800 },
            { description: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
    2: {
        topic: 'This is something for the thingy',
        board: [
            { description: 'text here idk', img: 'some src', value: 100 },
            { description: 'text here idk', img: 'some src', value: 200 },
            { description: 'text here idk', img: 'some src', value: 400 },
            { description: 'text here idk', img: 'some src', value: 800 },
            { description: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
    3: {
        topic: 'This is another title',
        board: [
            { description: 'text here idk', img: 'some src', value: 100 },
            { description: 'text here idk', img: 'some src', value: 200 },
            { description: 'text here idk', img: 'some src', value: 400 },
            { description: 'text here idk', img: 'some src', value: 800 },
            { description: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
    4: {
        topic: 'XBOX XBOX XBOX XBOX XBOX XBOX XBOX XBOX ',
        board: [
            { description: 'text here idk', img: 'some src', value: 100 },
            { description: 'text here idk', img: 'some src', value: 200 },
            { description: 'text here idk', img: 'some src', value: 400 },
            { description: 'text here idk', img: 'some src', value: 800 },
            { description: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
}

export { defaultBoard, binarySearch }
export type { BoardObj }