'use server';
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
const access_token = process.env.AUTH_TOKEN || 'access_token'
const signUpAction = async (data: FormData) => {
    const cookiesStore = cookies()
    const password = data.get('password')
    const confirm_password = data.get('confirm_password')
    const address = `${data.get('address1')} ${data.get('address2')}`
    if (password !== confirm_password) {
        throw Error("Passwords are not matched")
    }
    data.delete('address1')
    data.delete('address2')
    data.delete('confirm_password')
    data.append('address', address)
    const register_response = await fetch(`${process.env.AUTH_ENDPOINT}/register`, {

        method: 'post',
        body: data,

    })
    if (register_response.ok) {
        const data = await register_response.json()
        if ('access_token' in data) {
            cookiesStore.set({
                name: access_token,
                value: data['access_token'],
                expires: Date.now() + parseInt(data['expires_in']),
            })

            redirect('/me')
        } else {
            throw Error('Something Went Wrong')
        }
    } else {
        throw Error(await register_response.text())
    }
}

const loginAction = async (data: FormData) => {
    const cookiesStore = cookies()
    const login_response = await fetch(`${process.env.AUTH_ENDPOINT}/login`, {

        method: 'post',
        body: data,

    })
    if (login_response.ok) {
        const data = await login_response.json()
        if ('access_token' in data) {
            cookiesStore.set({
                name: access_token,
                value: data['access_token'],
                expires: Date.now() + parseInt(data['expires_in']),
            })

            redirect('/me')
        } else {
            throw Error('Something Went Wrong')
        }
    } else {
        throw Error(await login_response.text())
    }
}

export { signUpAction, loginAction }