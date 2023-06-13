import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <FontAwesomeIcon icon={faCheckCircle} width={200} height={200} className="mb-10 text-green-500" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Confirmed!</h1>
            <p className="text-lg text-gray-600">
                Thank you for your payment. Your transaction has been successfully processed.
            </p>
            <Link className="text-indigo-600 hover:underline-offset-auto" href="/me">
                Check your profile to see reservation
            </Link>
        </div>
    );
};