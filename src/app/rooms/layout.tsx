import Navbar from "@/components/navbars/secondary";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>

            <Navbar />

            <main>
                {children}
            </main>
        </>
    );
}