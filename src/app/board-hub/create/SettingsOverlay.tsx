import { PrimaryButton } from "@/components/Buttons"
import { BoardObj } from "./util"
import { SetStateAction, TextareaHTMLAttributes, useEffect, useState } from "react";

type props = {
    boardInfo: BoardObj,
    cardIdx: number[],
    updateCard: () => void,
    setBoardInfo: any;
}

const SettingsOverlay = ({ boardInfo, cardIdx, updateCard, setBoardInfo }: props) => {
    const [cardValue, setCardValue] = useState<number>(0);
    const [cardQuestion, setCardQuestion] = useState<string>('');
    const [cardAnswer, setCardAnswer] = useState<string>('');
    useEffect(() => {
        const cardInfo = boardInfo[cardIdx[1]].board[cardIdx[0]];
        setCardValue(cardInfo.value);
        setCardQuestion(cardInfo.question);
        setCardAnswer(cardInfo.answer);
        console.log(cardIdx);
    }, [cardIdx])


    const updateText = (setAttr: (state: SetStateAction<any>) => any) => {
        return (e: React.FormEvent<any>) => {
            const val = e.currentTarget.value;
            setAttr(val);
        }
    }

    const updateCardEntry = () => {

        updateCard();
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

            <div className="text-center">
                <h2 className="font-medium text-base">Row Cost</h2>
                <input id="card-cost" className='text-black rounded-md p-2 text-center' type='number' value={cardValue} min='1' step={1} onChange={updateText(setCardValue)} />
                <p>Note: this changes the value for the whole row</p>
            </div>
            <PrimaryButton style={{ width: '20%' }} onClick={updateCardEntry()}>Save?</PrimaryButton>
        </div>
    )
}

export default SettingsOverlay