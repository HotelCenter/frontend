import { NextFetchEvent, NextResponse } from "next/server";
import { NextRequest } from "next/server";
const access_token = process.env.AUTH_TOKEN || 'access_token';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    let response = NextResponse.next();
    if (request.nextUrl.pathname.startsWith('/me')) {
        if (!request.cookies.has(access_token)) {
            response = NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (/^(\/login|\/signup|\/reserve|\/me)$/i.test(request.nextUrl.pathname)) {
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

    }

    if (/^(\/reserve)$/i.test(request.nextUrl.pathname)) {
        if (!request.cookies.has(access_token)) {
            response = NextResponse.redirect(new URL('/login', request.url))

        }
    }
    if (/^(\/login|\/signup)$/i.test(request.nextUrl.pathname)) {
        if (request.cookies.has(access_token)) {
            response = NextResponse.redirect(new URL('/me', request.url))

        }
    }
    return response
}
