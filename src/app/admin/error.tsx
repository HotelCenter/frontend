'use client';

export default function Error({ error, reset }: { error: Error, reset: () => void }) {
    return (<div className="bg-red-900">
        <h2>Something Went wrong</h2>
        <button onClick={() => reset()}>Try Again</button>
    </div>)
}