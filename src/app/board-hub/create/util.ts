interface BoardObj {
    [key: number | string]: {
        topic: string,
        board:
        {
            question: string,
            answer: string,
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
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 100 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 200 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 400 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 800 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
    1: {
        topic: 'Title 2',
        board: [
            { answer:'some more text lol', question: 'text here idk', img: 'some src', value: 100 },
            { answer:'some more text lol', question: 'text here idk', img: 'some src', value: 200 },
            { answer:'some more text lol', question: 'text here idk', img: 'some src', value: 400 },
            { answer:'some more text lol', question: 'text here idk', img: 'some src', value: 800 },
            { answer:'some more text lol', question: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
    2: {
        topic: 'This is something for the thingy',
        board: [
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 100 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 200 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 400 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 800 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
    3: {
        topic: 'This is another title',
        board: [
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 100 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 200 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 400 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 800 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
    4: {
        topic: 'XBOX XBOX XBOX XBOX XBOX XBOX XBOX XBOX ',
        board: [
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 100 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 200 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 400 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 800 },
            {answer:'some more text lol', question: 'text here idk', img: 'some src', value: 1000 },
        ]
    },
}

export { defaultBoard, binarySearch }
export type { BoardObj }