'use client';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm";
import { useSearchParams } from "next/navigation";
<<<<<<< HEAD
import { useEffect, useRef, useState, useTransition } from "react";
import ReserveRoomCard from "@/components/ReserveRoomCard";
import Loading from "../loading";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

=======
import { useEffect, useState, useTransition } from "react";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
const options = {
    currency: "eur",
    amount: 1099,
    mode: 'payment'

};
>>>>>>> 8a50b70 (Page reserve)
const getRoom = async (roomId: Number) => {
    const room_response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/rooms/${roomId}`);
    return room_response.json()
}
export default function Page() {
    const params = useSearchParams()
    const [room, setRoom] = useState<RoomDataType>()
<<<<<<< HEAD
    const [reservationDetails, setReservationDetails] = useState<ReservationDataType>(null!)
    const [isPending, startTransition] = useTransition()
    const modalRef = useRef<HTMLDialogElement>(null!)
=======
    const [isPending, startTransition] = useTransition()
>>>>>>> 8a50b70 (Page reserve)
    useEffect(() => {
        startTransition(async () => setRoom(await getRoom(Number(params.get('room')))))

    }, [])
<<<<<<< HEAD

    useEffect(() => {
        console.log(reservationDetails)
    }, [reservationDetails])
    if (!room || isPending) {
        return <Loading />
    }

    return <>
        <dialog id="payment_modal" ref={modalRef} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Reserve Your Room!</h3>
                <Elements stripe={stripePromise} options={{
                    mode: 'payment',
                    currency: 'usd',
                    amount: 100
                }}>
                    <PaymentForm reservationDetails={reservationDetails!} />
                </Elements>
                <div className="modal-action">
                    <button className="btn">Close</button>
                </div>
            </div>
        </dialog>
        <ReserveRoomCard reservationDetails={reservationDetails} setReservationDetails={setReservationDetails} modalRef={modalRef} room={room} />
    </>


=======
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
>>>>>>> 8a50b70 (Page reserve)
}
