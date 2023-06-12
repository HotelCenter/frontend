import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const params = new URLSearchParams(request.nextUrl.search)
    let hotels = []
    try {
        if (params.has('page') && params.has('limit')) {
            const hotels_response = await fetch(`${process.env.API_ENDPOINT}/hotels?page=${params.get('page')}&limit=${params.get('limit')}`)
            const { data } = await hotels_response.json()
            hotels = data
        } else {
            const hotels_response = await fetch(`${process.env.API_ENDPOINT}/hotels`)
            hotels = await hotels_response.json()
        }
        return NextResponse.json(hotels)
    } catch (err: any) {
        return new NextResponse(err, { status: 400 })
    }
}
