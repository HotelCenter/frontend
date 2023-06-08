import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
export async function POST(request: NextRequest) {


    const { reservation: reservation_id } = Object.fromEntries((await request.formData()).entries())
    try {
        const authorization = request.headers.get('Authorization')
        if (authorization) {
            const reservation_res = await fetch(`${process.env.API_ENDPOINT}/reservations/confirmpayment/${reservation_id}`, {
                method: "POST",
                headers: {
                    "Authorization": authorization
                },

            })
            return NextResponse.json(await reservation_res.json())

        } else {
            throw Error('must authenticated');

        }
    } catch (err: any) {
        return new NextResponse(err, { status: 400 });
    }
}