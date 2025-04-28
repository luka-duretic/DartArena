"use client";

import { useEffect, useState } from "react";
import { IoSunny, IoMoonOutline } from "react-icons/io5";
import { AuthProvider } from "./context/AuthContext";
import "./globals.css";
import { Provider } from "./client";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    } else {
      localStorage.setItem("mode", "light");
    }
  }, []);

  const handleMode = () => {
    let mode = document.documentElement.className.split(" ")[0];

    if (mode === "dark") {
      setMode("light");
      localStorage.setItem("mode", "light");
    } else {
      setMode("dark");
      localStorage.setItem("mode", "dark");
    }
  };

  return (
    <html
      lang="en"
      className={(mode === "dark" ? "dark" : "light") + " scroll-smooth"}
      suppressHydrationWarning
    >
      {/* TAB izgled */}
      <link rel="icon" type="image/png" href="/images/icon.png" />
      <title>Dart Arena</title>
      <body>
        <div className="fixed z-40 bottom-4 right-4">
          <input
            type="checkbox"
            className="checkbox z-30 ml-2 w-[2rem] h-[1.6rem]"
            id="checkbox"
            checked={mode === "dark"}
            onChange={handleMode}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            <i className="fas fa-moon">
              <IoSunny />
            </i>
            <i className="fas fa-sun">
              <IoMoonOutline />
            </i>
            <span className="ball" />
          </label>
        </div>
        <AuthProvider>
          <Provider>{children}</Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
