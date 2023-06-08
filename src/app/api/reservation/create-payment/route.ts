import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
export async function POST(request: NextRequest) {
    const { data } = await request.json();
    const { reservationDetails }: { reservationDetails: ReservationDataType } = data;
    try {
        const authorization = request.headers.get('Authorization')
        if (authorization) {
            const user_res = await fetch(`${process.env.API_ENDPOINT}/me`, {
                method: "POST",
                headers: {
                    "Authorization": authorization
                }
            })

            const user: UserDataType = await user_res.json()
            const data: ReservationDataType & { user_id: number } = {
                ...reservationDetails,
                user_id: user.id
            }
            const formData = new FormData()
            formData.append('children_count', data['children_count'].toString())
            formData.append('amount', data['amount'].toString())
            formData.append('adult_count', data['adult_count'].toString())
            formData.append('user_id', data['user_id'].toString())
            formData.append('room_id', data['room_id'].toString())
            formData.append('checkin_date', data['checkin_date'])
            formData.append('checkout_date', data['checkout_date'])
            const reserve_res = await fetch(`${process.env.API_ENDPOINT}/reservations`, {
                method: 'POST',
                body: formData,
                headers: {
                    "Authorization": authorization

                }
            })
            const reservation = await reserve_res.json()
            const customer = await stripe.customers.create({
                email: user.email,
                name: `${user.first_name} ${user.last_name}`,
                phone: user.phone_number,


            }
            )

            const paymentIntent = await stripe.paymentIntents.create({
                amount: Number(reservationDetails.amount) * 100,
                currency: 'USD',
                automatic_payment_methods: {
                    enabled: true,

                }
                ,
                customer: customer.id,
                metadata: {
                    reservation: reservation.id
                }

            });



            return new NextResponse(paymentIntent.client_secret, { status: 200 });
        } else {
            throw Error('must authenticated');

        }
    } catch (err: any) {
        return new NextResponse(err, { status: 400 });
    }
}