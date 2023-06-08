import { NextRequest, NextResponse } from "next/server";
<<<<<<< HEAD
=======
const access_token = process.env.AUTH_TOKEN || 'access_token';
>>>>>>> 9b85209 (api route to verify authentication and access token)

export async function POST(req: NextRequest) {
    let response = NextResponse.json({ authenticated: false })
    const authorization = req.headers.get('Authorization')
    if (authorization) {
        const auth_response = await fetch(`${process.env.AUTH_ENDPOINT!}/authenticated`, {
            method: 'POST',
            headers: {
                "Authorization": authorization
            }
        })
        const data = await auth_response.json()
        if ('authenticated' in data) {
            response = NextResponse.json(data)
        }
    }
    return response;
}