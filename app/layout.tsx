import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Student Management",
  description: "ระบบจัดการข้อมูลนักศึกษา (Next.js + Prisma + SQLite)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
