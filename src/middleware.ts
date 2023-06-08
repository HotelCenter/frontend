import { NextFetchEvent, NextResponse } from "next/server";
import { NextRequest } from "next/server";
import stripe from "./lib/stripe";
const access_token = process.env.AUTH_TOKEN || 'access_token';
export async function middleware(request: NextRequest, event: NextFetchEvent) {
    let response = NextResponse.next();
    if (request.nextUrl.pathname.startsWith('/me')) {
        if (!request.cookies.has(access_token)) {
            response = NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if (/^(\/login|\/signup|\/reserve|\/me|\/api\/reservation\/confirmed|\/api\/reservation\/create-payment|\/api\/reservation\/confirmed|\/reserve\/redirect)$/i.test(request.nextUrl.pathname)) {
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
    if (/^(\/reserve\/redirect|\/api\/reservation\/create-payment|\/api\/reservation\/confirmed)$/i.test(request.nextUrl.pathname)) {
        response.headers.append('Authorization', `${process.env.TOKEN_TYPE} ${request.cookies.get(access_token)?.value}`)
    }

    if (/^(\/reserve\/redirect)$/i.test(request.nextUrl.pathname)) {
        const paramsSearch = new URLSearchParams(request.nextUrl.search)
        if (paramsSearch.has('payment_intent') && paramsSearch.has('payment_intent_client_secret')) {

            const payment = await stripe.paymentIntents.retrieve(paramsSearch.get('payment_intent')!)
            if (payment.status === "succeeded") {
                const formData = new FormData()
                formData.append('reservation', payment.metadata.reservation)
                await fetch(new URL(`/api/reservation/confirmed`, request.nextUrl), {
                    body: formData,
                    method: 'post',
                    headers: {
                        'Authorization': response.headers.get('Authorization')!
                    }
                });



                response = NextResponse.redirect(
                    new URL('/reserve/confirmed', request.nextUrl))
            } else {
                response = NextResponse.redirect(new URL('/reserve/failed', request.nextUrl))

            }
        } else {
            response = NextResponse.redirect(request.nextUrl)
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
