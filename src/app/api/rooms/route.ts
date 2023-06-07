import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const rooms_response = await fetch(`${process.env.API_ENDPOINT}/hotels`)
    const rooms = await rooms_response.json()
    return NextResponse.json(rooms)
}