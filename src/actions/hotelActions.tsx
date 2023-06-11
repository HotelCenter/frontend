'use server';
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

    const hotels_response = await fetch(`${process.env.API_ENDPOINT}/hotels/filter?${params.toString()}`)
    // console.log(await hotels_response.json())

    return hotels_response.json()
}