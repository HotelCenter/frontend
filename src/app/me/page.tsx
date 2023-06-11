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
    const user:UserDataType = await getUser()
    return (
        <div className="bg-gray-100 py-6">
          <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <div className="px-6 py-4">
              <div className="text-2xl font-bold mb-2">User Profile</div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  ID
                </label>
                <p className="text-gray-900 text-base">{user.id}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <p className="text-gray-900 text-base">
                  {user.first_name} {user.last_name}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <p className="text-gray-900 text-base">{user.email}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email Verified
                </label>
                <p className="text-gray-900 text-base">
                  {user.email_verified_at ? 'Yes' : 'No'}
                </p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Address
                </label>
                <p className="text-gray-900 text-base">{user.address}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Country
                </label>
                <p className="text-gray-900 text-base">{user.country}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City
                </label>
                <p className="text-gray-900 text-base">{user.city}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Phone Number
                </label>
                <p className="text-gray-900 text-base">{user.phone_number}</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Postal Code
                </label>
                <p className="text-gray-900 text-base">{user.code_postal}</p>
              </div>
            </div>
          </div>
        </div>
      );
    
}