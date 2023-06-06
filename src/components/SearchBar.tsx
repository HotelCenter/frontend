import { useState } from 'react'
import Datepicker from 'react-tailwindcss-datepicker'
import { DateValueType } from 'react-tailwindcss-datepicker/dist/types'
import moment from 'moment'
const DropDownFilter = () => {
    return (<>


        <button id="dropdownInformationButton" data-dropdown-toggle="dropdownInformation" className="text-white rounded-lg bg-blue-700 hover:bg-blue-800  font-medium text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Filters <svg className="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>
        <div id="dropdownInformation" className="z-10 mb-5 hidden rounded-lg bg-white divide-y divide-gray-100  shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>Bonnie Green</div>
                <div className="font-medium truncate">name@flowbite.com</div>
            </div>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Settings</a>
                </li>
                <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</a>
                </li>
            </ul>
            <div className="py-2">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</a>
            </div>
        </div>

    </>)
}
const SearchDest = () => {
    return (
        <>
            <div className="relative">
                <input type="text" id="floating_outlined" className="h-full block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="floating_outlined" className=" absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">From</label>
            </div>
            <div className="relative">
                <input type="text" id="floating_outlined" className="h-full block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">To</label>
            </div>
        </>
    )
}
export default function SearchBar() {
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
        <form className="join ">
            <div>
                <input className="input join-item bg-base-100" placeholder="Destination..." />
            </div>

            <Datepicker showShortcuts={true}
                inputClassName='bg-base-200 border-none input join-item text-white'
                minDate={moment().add(-1, 'day').toDate()} value={dateValue} onChange={handleDateChange} />
            <div className="dropdown w-full">
                <label tabIndex={0} className="btn join-item">{adultsCount} Adults | {childrenCount} Children | {roomsCount} Rooms</label>
                <ul tabIndex={0} className="space-y-2 dropdown-content menu p-5 shadow bg-base-300 rounded-box w-60">
                    <div className='grid grid-cols-2 items-center grid-rows-1'>
                        <span>Adults</span>

                        <li>
                            <input type="number" onChange={(e) => setAdultsCount(parseInt(e.target.value))} placeholder="Adults" value={adultsCount} min={1} max={100} className="input input-bordered w-full max-w-xs" />
                        </li>
                    </div>
                    <div className='grid grid-cols-2 items-center grid-rows-1'>
                        <span>Children</span>
                        <li>
                            <input type="number" onChange={(e) => setChildrenCount(parseInt(e.target.value))} placeholder="Children" value={childrenCount} min={0} max={10} className="input input-bordered w-full max-w-xs" />

                        </li>
                    </div>
                    <div className='grid grid-cols-2 items-center grid-rows-1'>
                        <span>Rooms</span>
                        <li>
                            <input type="number" placeholder="Rooms" onChange={(e) => setRoomsCount(parseInt(e.target.value))} value={roomsCount} min={1} max={100} className="input input-bordered w-full max-w-xs" />

                        </li>
                    </div>
                </ul>
            </div>
            <div className="indicator">
                <span className="indicator-item badge badge-secondary">new</span>
                <button className="btn join-item">Search</button>
            </div>
        </form>
    )
}