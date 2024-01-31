import { PrimaryButton, SecondaryButton } from '../components/Buttons'
import { randText } from '@/hooks/useRandTitle'
import Link from 'next/link'

const HomePage = () => {
    const s = randText();
    return (
        <div className='font-mono h-[70vh] flex justify-center items-center'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='text-4xl sm:text-5xl font-bold mb-4 text-center'>{s}!</h1>
                <Link href='/login'>
                    <PrimaryButton>
                        Login
                    </PrimaryButton>
                </Link>
            </div>
        </div>
    )
}

export default HomePage