import Footer from "./components/main/footer";
import Header from "./components/main/header";
import { NextAuthProvider } from './Providers'

import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Menu | Lagham Restaurant",
  description: "Generated by Rockai Dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-950 font-mainFont flex flex-col justify-start items-center relative text-textColor">
        <NextAuthProvider>
        <Header />
        {children}
        <Footer />
        </NextAuthProvider>
        <Script src="Js/main.js" />
      </body>
    </html>
  );
}
