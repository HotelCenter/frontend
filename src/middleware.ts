import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import stripe from "./lib/stripe";
import bindM from "./nextmiddlewarerouter";
const access_token = process.env.AUTH_TOKEN || 'access_token';
export async function middleware(request: NextRequest, event: NextFetchEvent) {
    let response = NextResponse.next();



    response = await bindM(request);
    if (request.cookies.has(access_token)) {
        response.headers.append('Authorization', `${process.env.TOKEN_TYPE} ${request.cookies.get(access_token)?.value}`)
    }

    return response
}
