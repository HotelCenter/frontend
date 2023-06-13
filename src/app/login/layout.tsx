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
                <div className="md:w-6/12 m-auto">
                    <div className="mx-2 my-6">
                        <h2 className="text-4xl font-extrabold dark:text-white">Login</h2>
                        <p className="my-4 text-lg text-gray-500">Please fill this form to login</p>
                    </div>
                    {children}
                </div>
            </main>
        </>
    );
}