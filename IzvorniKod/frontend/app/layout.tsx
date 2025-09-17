"use client";

import "./bootstrap-custom.scss";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "./client";
import "./globals.css";
import ClientWrapper from "./ClientWrapper";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className=" scroll-smooth" suppressHydrationWarning>
      <Provider>
        {/* TAB izgled */}
        <link rel="icon" type="image/png" href="/images/icon.png" />
        <title>Dart Arena</title>
        <body>
          <ClientWrapper />
          <QueryClientProvider client={queryClient}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        </body>
      </Provider>
    </html>
  );
}
