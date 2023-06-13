import { cookies } from "next/headers"
import Link from "next/link";
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
  const user: UserDataType = await getUser()
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-slate-200 to-slate-600">
      <div className="bg-white rounded-lg shadow-md w-96 p-8">
        <div className="flex items-center justify-center">
          <img
            src="profile.jpg"
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
        </div>
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800">
            {user.first_name} {user.last_name}
          </h2>
          <p className="mt-2 text-gray-600">{user.email}</p>
          <p className="mt-2 text-bold text-info">
            {user.is_admin ? 'Admin' : 'User'}
          </p>
        </div>
        <div className="mt-8">
          <div className="flex justify-between text-gray-700">
            <span>Address:</span>
            <span>{user.address}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Country:</span>
            <span>{user.country}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>City:</span>
            <span>{user.city}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Phone Number:</span>
            <span>{user.phone_number}</span>
          </div>
          <div className="flex justify-between text-gray-700">
            <span>Postal Code:</span>
            <span>{user.code_postal}</span>
          </div>
        </div>
      </div>
    </div>
  );

}