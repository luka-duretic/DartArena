import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
        {/* TAB izgled */}
        <link rel="icon" type="image/png" href="/images/icon.png" />
        <title>Dart Arena</title>
      <body>
        {children}
      </body>
    </html>
  );
}
