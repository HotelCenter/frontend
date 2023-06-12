import Navbar from "@/components/navbars/profile/Navbar";

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