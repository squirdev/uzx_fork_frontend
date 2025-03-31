"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

import ReduxProvider from "../../redux/reduxProvider";
import ScrollToTopButton from "./components/scrollToTop";

import { usePathname } from "next/navigation";
import { LanguageProvider } from "../../context/LanguageProvider";
import { AlertProvider } from "../../context/alertContext";

const hideFooterRoutes = [
  "/login",
  "/register",
  "/findPwd",
  "/retrieveprivate",
];

function RootLayout({ children }) {
  const pathname = usePathname();
  const shouldShowFooter = !hideFooterRoutes.some(
    (route) => pathname === route || pathname.startsWith("/exchange/")
  );
  return (
    <html lang="en">
      <head>
        <title>UZX</title>
      </head>
      <body className="bg-black">
        <ReduxProvider>
            <LanguageProvider>
              <Header />
              <AlertProvider>{children}</AlertProvider>
              <ScrollToTopButton />
              {shouldShowFooter && <Footer />}
            </LanguageProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

export default RootLayout;
