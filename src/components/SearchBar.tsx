import { Dispatch, SetStateAction, useState, useTransition } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types'
import moment from 'moment'
import { searchHotelAction } from '@/actions/hotelActions'

export default function SearchBar({ setHotels }: { setHotels: Dispatch<SetStateAction<HotelDataType[]>> }) {
    const [isPending, startTransition] = useTransition()
    const [childrenCount, setChildrenCount] = useState(0)
    const [adultsCount, setAdultsCount] = useState(1)
    const [roomsCount, setRoomsCount] = useState(1)
    const [dateValue, setDateValue] = useState<DateValueType>({
        startDate: moment().toDate(),
        endDate: moment().add(1, 'day').toDate()
    });

    const handleDateChange = (newValue: DateValueType) => {
        console.log("newValue:", newValue);
        setDateValue(newValue);
    }
    return (
        <div className="join ">
            <div>
                <input className="input join-item bg-base-100" placeholder="Destination..." />
            </div>

            <Datepicker showShortcuts={true}
                inputClassName='bg-base-200 border-none input join-item'
                minDate={new Date(Date.now())} value={value} onChange={handleValueChange} />
            <div className="dropdown w-full">
                <label tabIndex={0} className="btn join-item">{adultsCount} Adults | {childrenCount} Children | {roomsCount} Rooms</label>
                <ul tabIndex={0} className="space-y-2 dropdown-content menu p-5 shadow bg-base-300 rounded-box w-60">
                    <div className='grid grid-cols-2 items-center grid-rows-1'>
                        <span>Adults</span>

                        <li>
                            <input name='adults' type="number" onChange={(e) => setAdultsCount(parseInt(e.target.value))} placeholder="Adults" value={adultsCount} min={1} max={100} className="input input-bordered w-full max-w-xs" />
                        </li>
                    </div>
                    <div className='grid grid-cols-2 items-center grid-rows-1'>
                        <span>Children</span>
                        <li>
                            <input name='children' type="number" onChange={(e) => setChildrenCount(parseInt(e.target.value))} placeholder="Children" value={childrenCount} min={0} max={10} className="input input-bordered w-full max-w-xs" />

                        </li>
                    </div>
                    <div className='grid grid-cols-2 items-center grid-rows-1'>
                        <span>Rooms</span>
                        <li>
                            <input name="rooms" type="number" placeholder="Rooms" onChange={(e) => setRoomsCount(parseInt(e.target.value))} value={roomsCount} min={1} max={100} className="input input-bordered w-full max-w-xs" />

                        </li>
                    </div>
                </ul>
            </div>
            <div className="indicator">
                <span className="indicator-item badge badge-secondary">new</span>
                <button className="btn join-item" type='submit'>Search</button>
            </div>
        </div>
    )
}