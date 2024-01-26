
import { BsDash, BsPlus } from 'react-icons/bs'
import BoardEntry from '@/components/boardEntry/BoardEntry'

type props = {
    topic: any,
    id: number,
    removeCol: any,
    removeRow: any,
    isEndCol: boolean,
}

const Column = ({ topic, id, removeCol, removeRow, isEndCol }: props) => {
    // I KNOW THIS IS REALLY MESSY BUT ITS JUST HOW IT HAS TO WORK LEAVE ME ALONE :(

    return (
        <div id={`${id}`} className='flex flex-col transition'>
            <div onClick={removeCol(id)} className='mb-1 relative font-medium text-2xl bg-red-500 rounded-full mx-auto p-1 hover:cursor-pointer hover:bg-red-700 group'>
                <BsDash />
                <span className='text-base text-white bg-primary rounded-md p-1 absolute w-auto min-w-max font-bold -top-9 left-[50%] translate-x-[-50%] scale-0 group-hover:scale-100 text-center'>
                    Remove Column
                </span>
            </div>
            {Object.entries(topic).map(([key, val], idx) => {
                return (
                    <div className={`${key === 'topic' && 'flex-1'} relative`} key={idx}>
                        {(isEndCol && idx !== 0) &&
                            <div onClick={removeRow(idx)} className='z-10 absolute -right-9 top-[50%] translate-y-[-50%] font-medium text-2xl bg-red-500 rounded-full mx-auto p-1 hover:cursor-pointer hover:bg-red-700 group'>
                                <BsDash />
                                <span className='text-base text-white bg-primary rounded-md p-1 absolute w-auto min-w-max font-bold top-0 translate-x-[-110%] scale-0 group-hover:scale-100 text-center'>
                                    Remove Row
                                </span>
                            </div>
                        }
                        <BoardEntry style={{ height: '100%' }} title={key === 'topic' ? topic[key] : topic[key as keyof typeof val]['value']} key={idx}></BoardEntry>
                    </div>
                )
            })}
        </div >
    )
}

export default Column;