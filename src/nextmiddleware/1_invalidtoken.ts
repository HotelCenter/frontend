import { NextRequest, NextResponse } from "next/server"
const access_token = process.env.AUTH_TOKEN || 'access_token';

export default async function middleware(request: NextRequest) {
    let response = NextResponse.next()
    if (request.cookies.has(access_token)) {
        const auth_response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/auth`, {
            method: 'POST',
            headers: {
                "Authorization": `${process.env.TOKEN_TYPE} ${request.cookies.get(access_token)?.value}`
            }
        })
        const { authenticated } = await auth_response.json()
        if (!authenticated) {

            response = NextResponse.redirect(new URL('/login', request.url))
            response.headers.append(
                "Set-Cookie", `${access_token}=""; Path=/ ; Max-Age=-1`
            )
        }
    }
    return response;

}

export const routes = {
    me: null,
    api: {
        reservation: {
            confirmed: null,
            'create-payment': null
        }
    },
    reserve: ['redirect'],
}