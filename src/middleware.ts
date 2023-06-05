import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
const access_token = process.env.AUTH_TOKEN || 'access_token';

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/me')) {
        if (!request.cookies.has(access_token)) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
    if (/^(\/login|\/signup)$/i.test(request.nextUrl.pathname)) {
        if (request.cookies.has(access_token)) {
            return NextResponse.redirect(new URL('/me', request.url))

        }
    }
    return NextResponse.next()
}
