import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

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