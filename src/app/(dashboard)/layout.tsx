import DashboardLayout from "@/components/layouts/DashboardLayout";
import Navbar from "@/components/Navbar";
import { generateLayoutMetadata } from "@/lib/metadata-helper";

export const metadata = generateLayoutMetadata({
  title: "Dashboard",
  noIndex: true,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 min-h-0">
        <DashboardLayout>{children}</DashboardLayout>
      </main>
    </div>
  );
}
