import { fetchData } from "@/utils"

export const getHotels = async () => {
    try {

        const hotels_res = await fetchData(`${process.env.NEXT_PUBLIC_ENDPOINT!}/api/hotels?page=1&limit=15`)

        return hotels_res.json()
    } catch (err: any) {
        throw Error(err)
    }
}