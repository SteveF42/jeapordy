import { PrimaryButton } from "@/components/Buttons"
import { BoardObj, uploadMedia } from "./util"
import { SetStateAction, useEffect, useState } from "react";

type props = {
    boardInfo: BoardObj,
    cardIdx: number[],
    updateDisplay: () => void,
    setBoardInfo: any;
    saveBoard: () => void
}

const SettingsOverlay = ({ boardInfo, cardIdx, updateDisplay, setBoardInfo, saveBoard }: props) => {
    const [cardValue, setCardValue] = useState<number>(0);
    const [cardQuestion, setCardQuestion] = useState<string>('');
    const [cardAnswer, setCardAnswer] = useState<string>('');
    const [cardImg, setCardImg] = useState<string>('')
    const [uploadMsg, setUploadMsg] = useState<string | null>(null);
    const [uploadProgress, setUploadProgress] = useState({ started: false, progress: 0 })
    const [file, setFile] = useState<any>(null);
    const [randomkey, setRandomkey] = useState(Math.random().toString(36))

    useEffect(() => {
        const cardInfo = boardInfo.columns[cardIdx[1]].cards[cardIdx[0]];
        setCardValue(cardInfo?.value);
        setCardQuestion(cardInfo?.question);
        setCardAnswer(cardInfo?.answer);
        setCardImg(cardInfo?.image);
        setUploadMsg(null)
        setFile(null);
        setUploadProgress({ started: false, progress: 0 })
        setRandomkey(Math.random().toString(36))
        console.log(cardIdx);
    }, [cardIdx])


    const updateText = (setAttr: (state: SetStateAction<any>) => any) => {
        return (e: React.FormEvent<any>) => {
            const val = e.currentTarget.value;
            setAttr(val);
        }
    }

    const updateCardEntry = async () => {
        let getUrl = cardImg;
        if (file) {
            const { getUrl: newUrl, err }: any = await handleUpload();
            if (err) {
                return;
            }
            getUrl = newUrl;
        }

        const card = boardInfo.columns[cardIdx[1]].cards[cardIdx[0]]
        card.answer = cardAnswer;
        card.question = cardQuestion;
        card.value = cardValue;
        card.image = getUrl;

        boardInfo.columns.forEach(x => {
            x.cards[cardIdx[0]].value = cardValue;
            x.cards.sort((a, b) => a.value - b.value);
        })


        setBoardInfo(boardInfo);
        updateDisplay();
        saveBoard();
    }

    const handleUpload = async () => {
        if (!file) {
            setUploadMsg('No file selected');
            return;
        }
        if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
            alert('Invalid file type')
            return { getUrl: cardImg, err: null };
        }

        const fd = new FormData()
        const kb = 1024;
        const mb = kb * kb;
        if (file.size > mb * 8)
            return alert('File too large, max size is 8MB');

        fd.append(file.name, file);
        setUploadProgress({ started: true, progress: 0 });
        setUploadMsg('Uploading...');

        try {
            const res = await uploadMedia(file, setUploadProgress)
            if (cardImg) {
                fetch('/api/media', {
                    method: 'DELETE',
                    body: JSON.stringify({ url: cardImg }),
                    headers: { 'Content-Type': 'application/json' }
                })
            }
            setUploadMsg('Upload successful');
            setCardImg(res.getUrl);
            return { getUrl: res.getUrl, err: null };
        } catch (err) {
            console.log(err);
            setUploadMsg('Upload failed');
            return { getUrl: null, err };
        }
    }



    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setFile(e.currentTarget?.files ? e.currentTarget.files[0] : null)
    }

    return (
        <div className="flex flex-col justify-center items-center gap-y-4">
            <h1 className='text-2xl text-center font-medium'>Card Question</h1>
            <div className="flex gap-4 justify-center text-center mt-4 flex-wrap">
                <div>
                    <h2 className="text-xl font-medium">Question</h2>
                    <textarea rows={8} cols={35} className="text-black rounded-md p-2" value={cardQuestion} onChange={updateText(setCardQuestion)} />
                </div>
                <div>
                    <h2 className="text-xl font-medium">Answer</h2>
                    <textarea rows={8} cols={35} className="text-black rounded-md p-2" value={cardAnswer} onChange={updateText(setCardAnswer)} />
                </div>
            </div>
            <div className="flex justify-center items-center gap-4">
                {cardImg && <img src={cardImg} alt="card-img" className="h-40" />}
                <input type="file" onChange={handleChange} key={randomkey} />
                {/* <button className="bg-primary p-2 rounded-md font-semibold disabled:opacity-20" onClick={handleUpload} disabled={isUploading}>Upload</button> */}
                {uploadProgress.started && <progress value={uploadProgress.progress} max="100" />}
                {uploadMsg && <p>{uploadMsg}</p>}
            </div>
            <div className="text-center">
                <h2 className="font-medium text-base">Row Cost</h2>
                <input id="card-cost" className='text-black rounded-md p-2 text-center' type='number' value={cardValue} min='1' step={1} onChange={updateText(setCardValue)} />
                <p>Note: this changes the value for the whole row</p>
            </div>
            <PrimaryButton style={{ width: '20%' }} onClick={updateCardEntry}>Save?</PrimaryButton>
        </div>
    )
}

export default SettingsOverlay