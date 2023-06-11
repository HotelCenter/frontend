import { NextRequest, NextResponse } from "next/server"
const access_token = process.env.AUTH_TOKEN || 'access_token';

export default async function middleware(request: NextRequest, response: NextResponse) {
    if (!request.cookies.has(access_token)) {
        response = NextResponse.redirect(new URL('/login', request.url))

    }
    return response;

}

export const routes = {
    reserve: null,
    me: null,
    admin: null
}