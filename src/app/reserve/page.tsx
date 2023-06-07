'use client';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
const options = {
    currency: "eur",
    amount: 1099,
    mode: 'payment'

};
const getRoom = async (roomId: Number) => {
    const room_response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/rooms/${roomId}`);
    return room_response.json()
}
export default function Page() {
    const params = useSearchParams()
    const [room, setRoom] = useState<RoomDataType>()
    const [isPending, startTransition] = useTransition()
    useEffect(() => {
        startTransition(async () => setRoom(await getRoom(Number(params.get('room')))))

    }, [])
    useEffect(() => {
        console.log(room)

    }, [room])
    return <Elements stripe={stripePromise} options={{
        mode: 'payment',
        currency: 'usd',
        amount: 55
    }}>
        <PaymentForm />
    </Elements>
}
