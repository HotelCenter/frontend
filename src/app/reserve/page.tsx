'use client';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import ReserveRoomCard from "@/components/ReserveRoomCard";
import Loading from "../loading";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const getRoom = async (roomId: Number) => {
    const room_response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/rooms/${roomId}`);
    return room_response.json()
}
export default function Page() {
    const params = useSearchParams()
    const [cost, setCost] = useState<number>(0)
    const [room, setRoom] = useState<RoomDataType>()
    const [reservationDetails, setReservationDetails] = useState<ReservationDataType>(null!)
    const [isPending, startTransition] = useTransition()
    const modalRef = useRef<HTMLDialogElement>(null!)
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
=======
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
>>>>>>> 3482aaf (Configured reserve card)
                <h3 className="font-bold text-lg">Reserve Your Room!</h3>
                <Elements stripe={stripePromise} options={{
                    mode: 'payment',
                    currency: 'usd',
<<<<<<< HEAD
                    amount: 100
                }}>
                    <PaymentForm reservationDetails={reservationDetails!} />
=======
                    amount: 55
                }}>
                    <PaymentForm />
>>>>>>> 3482aaf (Configured reserve card)
                </Elements>
                <div className="modal-action">
                    <button className="btn">Close</button>
                </div>
<<<<<<< HEAD
            </div>
        </dialog>
        <ReserveRoomCard reservationDetails={reservationDetails} setReservationDetails={setReservationDetails} modalRef={modalRef} room={room} />
=======
            </form>
        </dialog>
        <ReserveRoomCard modalRef={modalRef} cost={cost!} setCost={setCost!} room={room} />
>>>>>>> 3482aaf (Configured reserve card)
    </>


}
