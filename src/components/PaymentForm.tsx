'use client';
import { CardElement, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement, StripeCardNumberElement } from "@stripe/stripe-js";
import axios from "axios";
import React from "react";
export default function PaymentForm() {
    const stripe = useStripe()
    const elements = useElements()

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            if (!stripe || !elements) return null;
            const cardElement = elements.getElement('card')
            elements.submit()
            const { data } = await axios.post("/api/create-payment", {
                data: { amount: 199 },
            });
            const clientSecret = data

            await stripe.confirmPayment({
                elements,
                clientSecret,
                confirmParams: {
                    return_url: `${process.env.NEXT_PUBLIC_ENDPOINT}/reserve/confirmed`
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