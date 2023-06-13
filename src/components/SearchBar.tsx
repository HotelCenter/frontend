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
      <div className="max-w-[1100px] mx-auto">
        <div className="relative block">
          <form className="block md:flex flex-wrap justify-center p-10  text-center "action={(data) => {
          startTransition(async () => setHotels(await searchHotelAction(data)));
          }}>
            <div className="px-0 md:px-2 w-full md:w-[24%] sm:mb-0">
              <div className=" mb-4 p-2 rounded-none"> {/*bg-white*/}
                <div className="flex items-center">
                  <span className="w-5 mr-4 align-top" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0zm-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25zm0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75h-7z"></path>
                    </svg>
                  </span>
                  <input
                    disabled={isPending}
                    className="input join-item bg-base-100 border-l-none text-[14px] font-bold leading-5 w-full"
                    placeholder="Destination..."
                    name='destination'
                  />
                  {/* <div className="absolute inset-0 border-none hover:border-black rounded-lg hover:ring-2 ring-gray-300">
                    <button className="btn btn-primary">Search</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="px-0 md:px-2 mb-4 w-full md:w-[39%] lg:w-[34%] ">
              <div className="p-2 rounded-none"> {/*bg-white*/}
                <div className="flex items-center">
                  {/* <span className="w-5 align-top" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M14.586 11H20c.55 0 1-.45 1-1s-.45-1-1-1h-5.414l1.293-1.293c.391-.39.391-1.024 0-1.414-.391-.39-1.024-.39-1.414 0L11 8.586V3c0-.55-.45-1-1-1s-1 .45-1 1v5.586L6.707 6.293c-.39-.39-1.024-.39-1.414 0-.39.391-.39 1.024 0 1.414L8.414 10H3c-.55 0-1 .45-1 1s.45 1 1 1h5.586L6.293 13.293c-.39.39-.39 1.024 0 1.414.391.39 1.024.39 1.414 0L10 14.414V20c0 .55.45 1 1 1s1-.45 1-1v-5.586l2.293 2.293c.39.39 1.024.39 1.414 0 .39-.391.39-1.024 0-1.414L13.414 12H19c.55 0 1-.45 1-1s-.45-1-1-1h-4.414l1.293-1.293c.391-.39.391-1.024 0-1.414-.391-.39-1.024-.39-1.414 0L14.586 11z"></path>
                    </svg>
                  </span> */}
                  <div className="w-full"> {/*input join-item p-0 bg-base-100 border-l-none text-[14px] font-bold leading-5 */}
                  <div className="flex items-center">
                  <span className="w-5 mr-4 align-top" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0zm-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25zm0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75h-7z"></path>
                    </svg>
                  </span>
                    <Datepicker showShortcuts={true} onChange={handleDateChange}
                      inputClassName='btn border-none input w-full join-item'
                      minDate={new Date(Date.now())} value={dateValue} inputName='checkingdates' disabled={isPending} />
                  </div>
                  </div>
                  {/* <div className="absolute inset-0 border-none hover:border-black rounded-lg hover:ring-2 ring-gray-300">
                    <button className="btn btn-primary">Search</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className="p-0 mb-4 md:px-2 w-full md:w-[31%]">
              <div className="p-2 rounded-none"> {/*bg-white*/}
                <div className="flex items-center">
                  {/* <span className="w-5 align-top" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M16 9.586V4c0-.55-.45-1-1-1s-1 .45-1 1v5.586L10.707 6.293c-.39-.39-1.024-.39-1.414 0-.39.391-.39 1.024 0 1.414L12.586 11H7c-.55 0-1 .45-1 1s.45 1 1 1h5.586L9.293 15.293c-.39.39-.39 1.024 0 1.414.391.39 1.024.39 1.414 0L14 14.414V20c0 .55.45 1 1 1s1-.45 1-1v-5.586l2.293 2.293c.39.39 1.024.39 1.414 0 .39-.391.39-1.024 0-1.414L16.414 12H22c.55 0 1-.45 1-1s-.45-1-1-1h-5.414l1.293-1.293c.391-.39.391-1.024 0-1.414-.391-.39-1.024-.39-1.414 0L16 9.586z"></path>
                    </svg>
                  </span> */}
                  <span className="w-full"> {/*input p-0 join-item bg-base-100 border-l-none text-[14px] font-bold leading-5*/}
                  <div className="flex items-center">
                  <span className="w-5 mr-4 align-top" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path d="M2.75 12h18.5c.69 0 1.25.56 1.25 1.25V18l.75-.75H.75l.75.75v-4.75c0-.69.56-1.25 1.25-1.25zm0-1.5A2.75 2.75 0 0 0 0 13.25V18c0 .414.336.75.75.75h22.5A.75.75 0 0 0 24 18v-4.75a2.75 2.75 0 0 0-2.75-2.75H2.75zM0 18v3a.75.75 0 0 0 1.5 0v-3A.75.75 0 0 0 0 18zm22.5 0v3a.75.75 0 0 0 1.5 0v-3a.75.75 0 0 0-1.5 0zm-.75-6.75V4.5a2.25 2.25 0 0 0-2.25-2.25h-15A2.25 2.25 0 0 0 2.25 4.5v6.75a.75.75 0 0 0 1.5 0V4.5a.75.75 0 0 1 .75-.75h15a.75.75 0 0 1 .75.75v6.75a.75.75 0 0 0 1.5 0zm-13.25-3h7a.25.25 0 0 1 .25.25v2.75l.75-.75h-9l.75.75V8.5a.25.25 0 0 1 .25-.25zm0-1.5A1.75 1.75 0 0 0 6.75 8.5v2.75c0 .414.336.75.75.75h9a.75.75 0 0 0 .75-.75V8.5a1.75 1.75 0 0 0-1.75-1.75h-7z"></path>
                    </svg>
                  </span>
                    <div className="dropdown w-full">
                      <label tabIndex={0} className="btn join-item text-center w-full">{adultsCount} Adults | {childrenCount} Children | {roomsCount} Rooms</label>
                      <ul tabIndex={0} className="space-y-2 dropdown-content menu p-5 shadow bg-base-300 rounded-box w-60 z-10">
                        <div className='grid grid-cols-2 items-center grid-rows-1 '>
                          <span>Adults</span>
                          <li>
                            <input disabled={isPending} name='adults' type="number" onChange={(e) => setAdultsCount(parseInt(e.target.value))} placeholder="Adults" value={adultsCount} min={1} max={100} className="input input-bordered w-full max-w-xs" />
                          </li>
                        </div>
                        <div className='grid grid-cols-2 items-center grid-rows-1'>
                          <span>Children</span>
                          <li>
                            <input disabled={isPending} name='children' type="number" onChange={(e) => setChildrenCount(parseInt(e.target.value))} placeholder="Children" value={childrenCount} min={0} max={10} className="input input-bordered w-full max-w-xs" />

                          </li>
                        </div>
                        <div className='grid grid-cols-2 items-center grid-rows-1'>
                          <span>Rooms</span>
                          <li>
                            <input disabled={isPending} name="rooms" type="number" placeholder="Rooms" onChange={(e) => setRoomsCount(parseInt(e.target.value))} value={roomsCount} min={1} max={100} className="input input-bordered w-full max-w-xs" />

                          </li>
                        </div>
                      </ul>
                    </div>
                    </div>
                  </span>
                  {/* <div className="absolute inset-0 border-none hover:border-black rounded-lg hover:ring-2 ring-gray-300">
                    <button className="btn btn-primary">Search</button>
                  </div> */}
                </div>
              </div>
            </div>

            <div className='flex-auto ml-0 items-center'>
                <div className='rounded-none self-center box-border w-full p-2'> {/*bg-white*/}
                  <div className='flex relative isolate w-full '> {/* border border-indigo-500 */}
                    {/* <div className='flex flex-grow w-full'>
                      <div className="indicator">
                        <span className="indicator-item badge badge-secondary">new</span>
                        <button disabled={isPending} className="btn join-item" type='submit'>{isPending ? <ButtonLoading /> : "Search"}</button>
                      </div>
                    </div> */}
                    <div className="text-center inset-0 border-none rounded-lg ring-gray-300 w-full">
                    <button className="btn btn-primary w-48 xl:w-24" disabled={isPending} type='submit'>{isPending ? <ButtonLoading /> : "Search"}</button>
                  </div>
                  </div>
                </div>
              </div>
              
          </form>

        </div>
      </div>


  )
}