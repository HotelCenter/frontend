import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
export default async function middleware(request: NextRequest, response: NextResponse) {
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
    return response
}
export const routes = {
    reserve: ['redirect']
}