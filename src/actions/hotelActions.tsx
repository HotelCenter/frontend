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

export async function updateHotel(data: FormData) {
    if (headers().has('authorization')) {
        if (data.has('hotelSlug')) {

            const authorization = headers().get('authorization')!
            let dataInJson = {}
            data.forEach((value, key) => {
                if (key === 'image') {
                    const file = value as File
                    if (file.name !== 'undefined') {
                        dataInJson = { ...dataInJson, image: file.name }

                    }
                } else if (key === 'rating') {
                    dataInJson = { ...dataInJson, [key as string]: Number(value) }

                } else {
                    if (value) {
                        dataInJson = { ...dataInJson, [key as string]: value }

                    }
                }
            })
            return (await fetchData(`${process.env.API_ENDPOINT}/hotels/${data.get('hotelSlug')}`, {
                method: 'PUT',
                headers: {
                    authorization,
                    'Content-Type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify(dataInJson)
            })).json()
        } else {
            throw { unknown: true }

        }
    } else {
        throw { notAuthorized: true }

    }

}

