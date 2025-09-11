import PublicProfileSidebar from "@/components/shared/dashboard/profile/public-view/sidebar/PublicProfileSidebar";

export default function PosterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background-secondary p-top">
      <div className="container-w py-0">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-4 md:gap-6 md:mt-3.5 md:items-start">
          <PublicProfileSidebar />
          <main className="w-full min-h-0 h-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
