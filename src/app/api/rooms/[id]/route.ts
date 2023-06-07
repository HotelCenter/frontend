import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: Number } }) {
    const room_response = await fetch(`${process.env.API_ENDPOINT}/rooms/${params.id}`)
    const room = await room_response.json()
    return NextResponse.json(room)
}