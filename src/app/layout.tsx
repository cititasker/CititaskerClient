import type { Metadata } from "next";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import { auth } from "@/auth";
import { getQueryClient } from "@/constant/queryClient";
import { API_ROUTES } from "@/constant";
import { getUserApi } from "@/services/user/users.api";
import { dehydrate } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "CitiTasker",
  description:
    "CitiTasker is a trusted community platform that connects people who need to outsource tasks and find local services, with people who are looking to earn money",
  openGraph: {
    type: "website",
    siteName: "CitiTasker",
    images: "http://localhost:3000/icons/icon.png",
    url: "https://cititasker.vercel.app",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  const queryClient = getQueryClient();

  // Prefetch user data on server if authenticated
  if (session?.user?.authToken) {
    await queryClient.prefetchQuery({
      queryKey: [API_ROUTES.GET_USER_DETAILS],
      queryFn: getUserApi,
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body className="relative">
        <AppProviders session={session} dehydratedState={dehydratedState}>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
