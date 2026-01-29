import PublicProfileSidebar from "@/components/shared/dashboard/profile/public-view/sidebar/PublicProfileSidebar";

export default function PosterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="container-w py-0">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-6 p-top pb-10">
          {/* Sidebar wrapper with sticky positioning */}
          <div className="md:sticky md:top-6 md:self-start md:h-fit">
            <PublicProfileSidebar />
          </div>

          {/* Main content with independent scroll */}
          <main className="w-full min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
