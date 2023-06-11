import { NextRequest, NextResponse } from "next/server";
const access_token = process.env.AUTH_TOKEN || 'access_token';

export default function middleware(request: NextRequest, response: NextResponse) {
    if (request.cookies.has(access_token)) {
        response = NextResponse.redirect(new URL('/me', request.url))

    }
    return response
}
export const routes = {
    signup: null,
    login: null,
}