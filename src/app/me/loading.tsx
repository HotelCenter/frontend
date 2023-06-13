export default function Loading() {
    return <div className="absolute items-center justify-center h-screen">
    <div className="flex flex-col items-center">
      <svg className="animate-spin h-10 w-10 text-indigo-500 mb-4" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0012 20c4.411 0 8-3.589 8-8h-2c0 3.866-3.134 7-7 7-1.524 0-2.936-.487-4.096-1.309L6 17.291z" />
      </svg>
      <p className="text-gray-500">Loading...</p>
    </div>
  </div>

}