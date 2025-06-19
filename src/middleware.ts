import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from './utils/Auth';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    if(!isAuthenticated) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    console.log("Check pathname from middleware:", pathname);
}

// See "Matching Paths" below to learn more
export const config = {
    // matcher: ["/((?!api|_next|icons|manifest|favicon).*)"], // exclude static files
    matcher: [
        "/user",
        "/dashboard"
    ], // exclude static files
}