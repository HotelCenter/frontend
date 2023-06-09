import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const hotels_response = await fetch(`${process.env.API_ENDPOINT}/hotels`)
    const hotels = await hotels_response.json()
    return NextResponse.json(hotels)
}