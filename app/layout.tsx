import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Plan2Sim Starter", description: "AI event simulation system starter" };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-Hant"><body>{children}</body></html>;
}
