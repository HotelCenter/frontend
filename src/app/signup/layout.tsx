import Navbar from "@/components/navbars/auth";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>

            <Navbar />
            <main className="m-16">
                <div className="mx-2 my-6">
                    <h2 className="text-4xl font-extrabold dark:text-white">Sign Up</h2>
                    <p className="my-4 text-lg text-gray-500">Please fill this form to register</p>
                </div>
                {children}
            </main>
        </>
    );
}