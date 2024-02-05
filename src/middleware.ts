import { withAuth } from 'next-auth/middleware'
import { NextRequest } from 'next/server'
import { dbConnect } from '../db'

export default withAuth(
    function middleware(req) {

    }
)
export const config = {
    matcher: ["/board-hub", "/board-hub/create"],
    pages: {
        signIn: '/login',
        error: '/'
    }
}