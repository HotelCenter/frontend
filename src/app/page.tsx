"use client"

import HotelCanvas from '@/components/360Hotel/HotelCanvas'
import HotelCard from '@/components/HotelCard'
import SearchBar from '@/components/SearchBar'
import { useEffect, useState, useTransition } from 'react'
const getHotels = async () => {
  const hotels_response = await fetch(`/api/hotels`)
  return await hotels_response.json()
}
export default function Home() {
  const [isPending, setTransition] = useTransition()
  const [hotels, setHotels] = useState<HotelDataType[]>([])
  useEffect(() => {

    setTransition(async () => setHotels(await getHotels()))

  }, [])
  return (
    <main className='mx-6'>
      <div className='w-full h-80'>
        {/* <HotelCanvas /> */}
        <SearchBar setHotels={setHotels} />
      </div>
      {isPending && <span className="loading loading-spinner loading-lg"></span>}
      <div className='grid grid-cols-3 grid-rows-3 gap-3'>
        {(!isPending && hotels.length === 0) && <h1>No Hotel available</h1>}
        {hotels.map((hotel, i) => <HotelCard hotel={hotel} key={i} />)}
      </div>
    </main>
  )
}
