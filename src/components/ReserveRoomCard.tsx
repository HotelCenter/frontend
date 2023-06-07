'use client';
import moment from "moment"
import React, { useEffect, useState } from "react"
import Datepicker from "react-tailwindcss-datepicker"
import { DateValueType } from "react-tailwindcss-datepicker/dist/types"

export default function ReserveRoomCard({ room, cost, setCost, modalRef }: { room: RoomDataType, cost: Number, setCost: React.Dispatch<React.SetStateAction<number>>, modalRef: React.RefObject<HTMLElement & { showModal: () => void }> }) {
    const [childrenCount, setChildrenCount] = useState(0)
    const [adultsCount, setAdultsCount] = useState(1)
    const [dateValue, setDateValue] = useState<DateValueType>({
        startDate: room.date_available,
        endDate: moment(room.date_available).add(1, 'day').toDate()
    });
    const handleDateChange = (newValue: DateValueType) => {
        console.log("newValue:", newValue);
        setDateValue(newValue);
    }
    useEffect(() => {
        setCost(room.base_price + room.adult_price * adultsCount + room.child_price * childrenCount)
    }, [childrenCount, adultsCount])
    return <div className="card w-6/12 mx-auto my-5 text-white  bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
            <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" className="rounded-xl" />
        </figure>
        <div className="card-body items-center text-center ">
            <h2 className="card-title">{cost.toFixed(2).toString()}$</h2>
            <p>{room.characteristics}</p>
            <div className="space-y-2">
                <Datepicker
                    inputClassName='bg-base-200   text-white'
                    minDate={room.date_available}
                    inputName='checkingdates' value={dateValue} startFrom={new Date(room.date_available)} onChange={handleDateChange} />
                <div className="form-control">
                    <label className="input-group">
                        <span>Adults</span>
                        <input name='adults' type="number" onChange={(e) => setAdultsCount(parseInt(e.target.value))} placeholder="Adults" value={adultsCount} min={1} max={100} className="input input-bordered w-full max-w-xs" />
                    </label>
                </div>
                <div className="form-control">
                    <label className="input-group">
                        <span>Children</span>
                        <input name='children' type="number" onChange={(e) => setChildrenCount(parseInt(e.target.value))} placeholder="Children" value={childrenCount} min={0} max={10} className="input input-bordered w-full max-w-xs" />
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
    </div>
}