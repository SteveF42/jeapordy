
import { BsDash, BsPlus } from 'react-icons/bs'
import BoardEntry from '@/components/boardEntry/BoardEntry'

const Column = ({ topic, id, removeCard, cols }: { topic: any, id: number, removeCard: any, cols: number }) => {
    return (
        <div id={`${id}`} className='flex flex-col transition'>
            <div onClick={removeCard(id)} className='relative font-medium text-2xl bg-red-500 rounded-full mx-auto p-1 hover:cursor-pointer hover:bg-red-700 group'>
                <BsDash />
                <span className='text-base text-white bg-third rounded-md p-1 absolute w-auto min-w-max font-bold -top-9 left-[50%] translate-x-[-50%] scale-0 group-hover:scale-100 text-center'>
                    Remove Column
                </span>
            </div>
            {Object.entries(topic).map(([key, val], idx) => {
                return (
                    <div>
                        <BoardEntry style={key === 'topic' ? { 'flexGrow': 1, position:'relative'} : {position:'relative'}} title={key === 'topic' ? topic[key] : topic[key as keyof typeof val]['value']} key={idx}></BoardEntry>
                        {true &&
                            <div onClick={removeCard(Number.parseInt(key))} className='relative font-medium text-2xl bg-red-500 rounded-full mx-auto p-1 hover:cursor-pointer hover:bg-red-700 group'>
                                <BsDash />
                                <span className='text-base text-white bg-third rounded-md p-1 absolute w-auto min-w-max font-bold -top-9 left-[50%] translate-x-[-50%] scale-0 group-hover:scale-100 text-center'>
                                    Remove Column
                                </span>
                            </div>
                        }
                    </div>
                )
            })}
        </div >
    )
}

export default Column;