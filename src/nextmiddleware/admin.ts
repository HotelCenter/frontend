import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest, response: NextResponse) {
    if (request.headers.has('authorization')) {
        const authorization = request.headers.get('authorization')

        const user_response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/me`, {
            method: 'POST',
            headers: {
                "Authorization": authorization!
            }
        })
        const user = await user_response.json()
        if (user.is_admin) {
            response = NextResponse.next()
        } else {
            response = NextResponse.redirect(new URL('/me', request.url))

        }
    } else {
        response = NextResponse.redirect(new URL('/login', request.url))

    }
    return response
}
export const routes = {
    admin: null
}