import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "dhp hospitality",
  description: "Redefining Five-Star Hospitality",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
