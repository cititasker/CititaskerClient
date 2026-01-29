import { generateLayoutMetadata } from "@/lib/metadata-helper";

export const metadata = generateLayoutMetadata({
  title: "Waitlist",
});

export default function WaitListLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
