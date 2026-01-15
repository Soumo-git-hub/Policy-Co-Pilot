import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Sidebar moved to specific layouts
import { WorkspaceProvider } from "@/context/WorkspaceContext";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast-system";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INTENT Policy Copilot",
  description: "Secure Policy Analysis Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <WorkspaceProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider>
              {children}
            </ToastProvider>
          </ThemeProvider>
        </WorkspaceProvider>
      </body>
    </html>
  );
}
