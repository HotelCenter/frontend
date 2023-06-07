'use client';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import ReserveRoomCard from "@/components/ReserveRoomCard";
import Loading from "../loading";
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
    const [cost, setCost] = useState<number>(0)
    const [room, setRoom] = useState<RoomDataType>()
    const [isPending, startTransition] = useTransition()
    const modalRef = useRef<HTMLDialogElement>(null!)
    useEffect(() => {
        startTransition(async () => setRoom(await getRoom(Number(params.get('room')))))

    }, [])
    useEffect(() => {
        if (room) {
            setCost(cost)
        }
    }, [room])
    if (!room || isPending) {
        return <Loading />
    }
    return <>
        <dialog id="payment_modal" ref={modalRef} className="modal">
            <form method="dialog" className="modal-box">
                <h3 className="font-bold text-lg">Reserve Your Room!</h3>
                <Elements stripe={stripePromise} options={{
                    mode: 'payment',
                    currency: 'usd',
                    amount: 55
                }}>
                    <PaymentForm />
                </Elements>
                <div className="modal-action">
                    <button className="btn">Close</button>
                </div>
            </form>
        </dialog>
        <ReserveRoomCard modalRef={modalRef} cost={cost!} setCost={setCost!} room={room} />
    </>


}
