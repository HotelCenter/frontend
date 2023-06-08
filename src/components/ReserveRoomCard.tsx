'use client';
import moment from "moment"
import React, { useEffect, useState } from "react"
import Datepicker from "react-tailwindcss-datepicker"
import { DateValueType } from "react-tailwindcss-datepicker/dist/types"

export default function ReserveRoomCard({ room, reservationDetails, setReservationDetails, modalRef }: {
    room: RoomDataType,
    reservationDetails: ReservationDataType,
    modalRef: React.RefObject<HTMLElement & { showModal: () => void }>,
    setReservationDetails: React.Dispatch<React.SetStateAction<ReservationDataType>>
}) {
    const [childrenCount, setChildrenCount] = useState(0)
    const [adultsCount, setAdultsCount] = useState(1)
    const [dateValue, setDateValue] = useState<DateValueType>({
        startDate: room.date_available,
        endDate: moment(room.date_available).add(1, 'day').toDate()
    });
    const [amount, setAmount] = useState(room.base_price)
    const handleDateChange = (newValue: DateValueType) => {
        setDateValue(newValue);
    }
    useEffect(() => {
        setAmount(Number(room.base_price) + Number(room.adult_price) * adultsCount + Number(room.child_price) * childrenCount)
    }, [childrenCount, adultsCount])

    useEffect(() => {
        if (dateValue?.startDate && dateValue.endDate) {
            setReservationDetails({
                room_id: room.id,
                checkin_date: moment(dateValue.startDate?.toString()).toISOString(),
                checkout_date: moment(dateValue.endDate?.toString()).toISOString(),
                amount,
                children_count: childrenCount,
                adult_count: adultsCount
            })
        }
    }, [amount, childrenCount, adultsCount, dateValue])
    return <>
        {reservationDetails !== null && <div className="card w-6/12 mx-auto my-5 text-white  bg-base-100 shadow-xl">
            <figure className="px-10 pt-10">
                <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center ">
                <h2 className="card-title">{parseFloat(amount.toString()).toFixed(2)}$</h2>
                <p>{room.characteristics}</p>
                <div className="space-y-2">
                    <Datepicker
                        inputClassName='bg-base-200   text-white'
                        minDate={room.date_available}
                        inputName='checkingdates' value={dateValue} startFrom={new Date(room.date_available)} onChange={handleDateChange} />
                    <div className="form-control">
                        <label className="input-group">
                            <span>Adults</span>
                            <input name='adults' type="number" onChange={(e) => setAdultsCount(Number(e.target.value))} placeholder="Adults" value={adultsCount} min={1} max={100} className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="input-group">
                            <span>Children</span>
                            <input name='children' type="number" onChange={(e) => setChildrenCount(Number(e.target.value))} placeholder="Children" value={childrenCount} min={0} max={10} className="input input-bordered w-full max-w-xs" />
                        </label>
                    </div>

                </div>
                <div className="card-actions">
                    <button className="btn btn-primary" onClick={() => {
                        if (modalRef) {
                            if (modalRef.current) modalRef.current.showModal()
                        }
                    }}>Reserve</button>
                </div>
            </div>
        </div>}</>
}