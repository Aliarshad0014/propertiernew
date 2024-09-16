"use client";
import React, { useState, useEffect } from "react";
import "./globals.css";
import Header from "@/components/header";
import FooterSection from "@/components/footer";
import { Poppins } from "next/font/google";
import { ChatContext } from "@/Contexts/ChatContext";
import { Toaster } from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";
import Script from "next/script";
import Head from "next/head";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [isUser, setIsUser] = useState(false);
  const hasWindow = typeof window !== "undefined";
  let loggedIn;

  if (hasWindow) {
    loggedIn = localStorage.getItem("user") ? true : false;
  }

  const history = useRouter();
  const path = usePathname();

  useEffect(() => {
    document.title = "Propertier";
  }, []);

  useEffect(() => {
    setIsUser(loggedIn);
    if (isUser && path === "/") {
      // history.push("/");
    } else if (!loggedIn) {
      history.push("/");
    }
  }, [isUser, loggedIn]);

  return (
    <html lang="en">
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NJ2J8VQ9');
          `,
          }}
        />
        {/* End Google Tag Manager */}
      </Head>
      <body className={poppins.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NJ2J8VQ9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9403488694655871"
          crossOrigin="anonymous"></Script>

        <div className="">
          <ChatContext.Provider
            value={{
              isUser,
              setIsUser,
            }}>
            <Toaster />
            <Header />
            {children}
          </ChatContext.Provider>
        </div>
        <FooterSection />
      </body>
    </html>
  );
}
