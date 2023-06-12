import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        if (request.headers.has('Authorization')) {
            const authorization = request.headers.get('Authorization')

            const user_res = await fetch(`${process.env.API_ENDPOINT}/me`, {
                method: "POST",
                headers: new Headers({
                    "Authorization": authorization!
                })
            })
            const user = await user_res.json()
            return NextResponse.json(user)
        } else {
            throw Error("User must be authenticated")
        }
    } catch (err: any) {
        return new NextResponse(err, { status: 400 });

    }
}