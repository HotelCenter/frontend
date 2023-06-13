import Navbar from "@/components/navbars/profile";

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