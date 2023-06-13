"use client"

import HotelCanvas from '@/components/360Hotel/HotelCanvas'
import HotelCard from '@/components/HotelCard'
import SearchBar from '@/components/SearchBar'
import Navbar from '@/components/navbars/Navbar'
import { useEffect, useState, useTransition } from 'react'
const getHotels = async () => {
  const hotels_response = await fetch(`/api/hotels`)
  return hotels_response.json()
}
export default function Home() {
  const [isPending, setTransition] = useTransition()
  const [hotels, setHotels] = useState<HotelDataType[]>([])
  useEffect(() => {

    setTransition(async () => setHotels(await getHotels()))

  }, [])
  return (
    <>
      <Navbar />

      <main>
        <div className='container mx-auto'>
          {(!isPending && hotels.length !== 0) &&

            <>
              <div className='w-full h-96'>


                <HotelCanvas />

              </div>



              <SearchBar setHotels={setHotels} />

            </>
          }

          {isPending && <span className="loading loading-spinner loading-lg"></span>}
          {(!isPending && hotels.length === 0) &&
            <div className="flex items-center justify-center h-screen">
              <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
                <h1 className="text-indigo-500 text-2xl text-center font-bold mb-4">No Hotel available</h1>
                <p className="text-gray-600">We apologize, but there are no hotels available at the moment.</p>
              </div>
            </div>
          }
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-3 gap-3'>
            {hotels.map((hotel, i) =>
              <HotelCard hotel={hotel} key={i} />
            )}
          </div>
        </div>
      </main>
    </>
  )
}
