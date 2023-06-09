import { Dispatch, SetStateAction, useState, useTransition } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types'
import moment from 'moment'
import { searchHotelAction } from '@/actions/hotelActions'
import { ButtonLoading } from './Loading'

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
        <form className="join " action={(data) => {
            startTransition(async () => setHotels(await searchHotelAction(data)));
        }}>
            <div>
                <input disabled={isPending} className="input join-item bg-base-100" name='destination' placeholder="Destination..." />
            </div>

            <Datepicker showShortcuts={true}
                inputClassName='bg-base-200 border-none input join-item text-white'
                minDate={moment().add(-1, 'day').toDate()}
                inputName='checkingdates' value={dateValue} disabled={isPending} onChange={handleDateChange} />
            <div className="dropdown w-full">
                <label tabIndex={0} className="btn join-item">{adultsCount} Adults | {childrenCount} Children | {roomsCount} Rooms</label>
                <ul tabIndex={0} className="space-y-2 dropdown-content menu p-5 shadow bg-base-300 rounded-box w-60">
                    <div className='grid grid-cols-2 items-center grid-rows-1'>
                        <span>Adults</span>

                        <li>
                            <input disabled={isPending} name='adults' type="number" onChange={(e) => setAdultsCount(parseInt(e.target.value))} placeholder="Adults" value={adultsCount} min={1} max={100} className="input input-bordered w-full max-w-xs" />
                        </li>
                    </div>
                    <div className='grid grid-cols-2 items-center grid-rows-1'>

                        <div className='flex-auto ml-0  flex'>
                            <div className='rounded-none bg-white self-center box-border w-full p-2'>
                                <div className='flex relative isolate  '> {/* border border-indigo-500 */}
                                    <div className=' items-center flex flex-grow w-full'>
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
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='flex-auto ml-0'>
                            <div className='rounded-none bg-white self-center box-border w-full p-2'>
                                <div className='flex relative isolate  '> {/* border border-indigo-500 */}
                                    <div className=' items-center flex flex-grow w-full'>
                                        <div className="indicator">
                                            <span className="indicator-item badge badge-secondary">new</span>
                                            <button disabled={isPending} className="btn join-item" type='submit'>{isPending ? <ButtonLoading /> : "Search"}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </ul>
            </div>
            <div className="indicator">
                <span className="indicator-item badge badge-secondary">new</span>
                <button disabled={isPending} className="btn join-item" type='submit'>{isPending ? <ButtonLoading /> : "Search"}</button>
            </div>
        </form>
    )



}