import { cookies } from "next/headers"
const access_token = process.env.AUTH_TOKEN || 'access_token';
const token_type = process.env.TOKEN_TYPE || 'Bearer';

const getUser = async () => {
    const cookiesStore = cookies()
    const user_response = await fetch(`${process.env.AUTH_ENDPOINT}/me`, {
        headers:
        {
            "Authorization": `${token_type} ${cookiesStore.get(access_token)?.value}`,
            "Accept": "application/json"
        }
        ,
        method: 'POST',
        body: null
    })
    return await user_response.json()
}
export default async function Page() {
    const user = await getUser()
    console.log(user)
    return <h1>ME PAGE</h1>
}