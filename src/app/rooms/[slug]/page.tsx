import RoomCard from "@/components/RoomCard"

const getRooms = async (id: HotelDataType['slug']) => {
    const rooms_response = await fetch(`${process.env.API_ENDPOINT}/hotels/rooms/${id}`)
    return rooms_response.json()
}
export default async function Page({ params }: { params: { slug: string } }) {

    const rooms: RoomDataType[] = await getRooms(params.slug)
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-rows-3 gap-3 mx-6 2xl:mx-0 my-5">
        {rooms.map((room) => (<RoomCard room={room} key={room.id} />))}
    </div>
}
export async function generateStaticParams() {
    const hotels_response = await fetch(`${process.env.API_ENDPOINT}/hotels`)
    const hotels = await hotels_response.json()
    return hotels.map((hotel: HotelDataType) => ({ slugs: hotel.slug }));
}