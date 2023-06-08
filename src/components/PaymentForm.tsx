'use client';
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React from "react";
export default function PaymentForm({ reservationDetails }: { reservationDetails: ReservationDataType }) {
    const stripe = useStripe()
    const elements = useElements()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (!stripe || !elements) return null;
            elements.submit()
            const { data } = await axios.post("/api/reservation/create-payment", {
                data: { reservationDetails: reservationDetails },
            });
            const clientSecret = data

            const confirmation_res = await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_ENDPOINT}/reserve/redirect`,
                }
            })
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <form onSubmit={onSubmit}>
            <PaymentElement />
            <button type="submit" disabled={!stripe}>Submit</button>
        </form>
    );
}