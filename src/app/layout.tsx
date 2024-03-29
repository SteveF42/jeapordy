export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

import '../index.css'
import NavBar from '@/components/NavBar'
import { randText } from '@/hooks/useRandTitle'
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='bg-background font-sans'>
      <body>
        <NavBar navTitle={randText()}/>
        {children}
      </body>
    </html>
  )
}
