'use server';

import { fetchData } from "@/utils";
import { headers } from "next/headers";

export const searchHotelAction = async (data: FormData) => {
    const checkingdates = data.get('checkingdates')?.toString().split('~')
    if (checkingdates?.length !== 2) {
        throw Error("Something wrong happened")
    }
    const checkindate = checkingdates[0].trim()
    const checkoutdate = checkingdates[1].trim()
    data.delete('checkingdates')
    data.append('checkindate', checkindate)
    data.append('checkoutdate', checkoutdate)
    const params = new URLSearchParams()
    data.forEach((value, key) => {
        params.append(key, value.toString())
    })

    const hotels_response = await fetchData(`${process.env.API_ENDPOINT}/hotels/filter?${params.toString()}`)

    return hotels_response.json()
}

export async function deleteHotel(data: FormData) {

    if (headers().has('authorization')) {
        if (data.has('hotelSlug')) {
            const authorization = headers().get('authorization')!
            const deleteHotel = await fetchData(`${process.env.API_ENDPOINT}/hotels/${data.get('hotelSlug')}`, {
                method: 'DELETE',
                headers: {
                    authorization
                }
            })
            await deleteHotel.json()
        } else {
            throw { unknown: true }

        }
    } else {
        throw { notAuthorized: true }

    }

}