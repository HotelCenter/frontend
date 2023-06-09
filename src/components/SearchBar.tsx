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
        <div className="w-6/12 relative left-2/4 m-20" style={{ transform: "translate(-50%,30px)", width: "calc(80% - 10px)" }}>
            <form className='m-0 p-0' action={(data) => {
                startTransition(async () => setHotels(await searchHotelAction(data)));
            }}>
                <div className='flex box-border relative w-full'>
                    <div className='flex-auto ml-0 flex w-[27%]'>
                        <div className='rounded-none bg-white self-center box-border w-full p-2'>
                            <div className='flex relative isolate  '> {/* border border-indigo-500 */}
                                <div className=' items-center flex flex-grow w-full'>
                                    <div className='px-2 flex content-center relative whitespace-nowrap z-10'>
                                        <span className="w-5 align-top " aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0zm-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25zm0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75h-7z"></path></svg></span>
                                    </div>
                                    <input name='destination' className="z-10 input join-item bg-base-100 border-l-none text-[14px] font-bold leading-5 width-full overflow-hidden overflow-ellipsis" placeholder="Destination..." />
                                    <div className=' border-none hover:border-black bottom-0 top-0 left-0 right-0 absolute rounded-lg '></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex-auto ml-0 w-[27%] box-border flex bg-white'>
                        <div className='rounded-none self-center box-border w-full p-2'>
                            <div className='flex relative isolate cursor-pointer'> {/* border border-indigo-500 */}
                                <div className=' items-center flex flex-grow w-full'>
                                    {/* <span className="w-9 align-top p-2" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22.5 13.5v8.25a.75.75 0 0 1-.75.75H2.25a.75.75 0 0 1-.75-.75V5.25a.75.75 0 0 1 .75-.75h19.5a.75.75 0 0 1 .75.75v8.25zm1.5 0V5.25A2.25 2.25 0 0 0 21.75 3H2.25A2.25 2.25 0 0 0 0 5.25v16.5A2.25 2.25 0 0 0 2.25 24h19.5A2.25 2.25 0 0 0 24 21.75V13.5zm-23.25-3h22.5a.75.75 0 0 0 0-1.5H.75a.75.75 0 0 0 0 1.5zM7.5 6V.75a.75.75 0 0 0-1.5 0V6a.75.75 0 0 0 1.5 0zM18 6V.75a.75.75 0 0 0-1.5 0V6A.75.75 0 0 0 18 6zM5.095 14.03a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28A1.125 1.125 0 1 0 12 15a1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zM12 18a1.125 1.125 0 1 0 0 2.25A1.125 1.125 0 0 0 12 18a.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm5.845-3.97a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5zm-.53 6.53a.75.75 0 1 0 1.06-1.06.75.75 0 0 0-1.06 1.06zm.53-1.28a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25.75.75 0 0 0 0 1.5.375.375 0 1 1 0-.75.375.375 0 0 1 0 .75.75.75 0 0 0 0-1.5z"></path></svg></span> */}
                                    <Datepicker showShortcuts={true} onChange={handleDateChange}
                                        inputClassName='btn border-none input join-item'
                                        minDate={new Date(Date.now())} value={dateValue} inputName='checkingdates' />
                                    {/* <button type="button" data-testid="date-display-field-start" className="border-none font-bold w-auto pr-1">Date d'arrivée</button>
                                        <span className=" self-center"> — </span>
                                        <button type="button" data-testid="date-display-field-end" className="border-none font-bold w-auto pr-1">Date de départ</button> */}
                                </div>
                            </div>
                        </div>
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
                </div>
            </form>


        </div>
    )
}