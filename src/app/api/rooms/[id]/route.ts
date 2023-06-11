import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: Number } }) {
    const room_response = await fetch(`${process.env.API_ENDPOINT}/rooms/${params.id}`,{
        headers:{
            "Accept":"application/json"
        }
    })
    // console.log((await room_response.text()).slice(0,300))
    const room = await room_response.json()
    
    return NextResponse.json(room)
}