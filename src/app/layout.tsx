import type {Metadata} from "next";
import type {ReactNode} from "react";

import {Toast} from "@heroui/react";

import "./globals.css";

export const metadata: Metadata = {
  description:
    "เว็บไซต์ประชาสัมพันธ์ สำนักงานป้องกันและปราบปรามการฟอกเงิน (ปปง.) — ข่าวสาร กิจกรรม และช่องทางติดต่อ",
  title: "ปปง. | สำนักงานป้องกันและปราบปรามการฟอกเงิน",
};

// Applies the persisted theme before first paint to avoid a flash of the wrong color scheme.
const themeScript = `(function(){try{var t=localStorage.getItem("theme");var m=window.matchMedia("(prefers-color-scheme: dark)").matches;if(t==="dark"||(!t&&m)){document.documentElement.classList.add("dark")}}catch(e){}})();`;

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning className="bg-background text-foreground" lang="th">
      <head>
        <script dangerouslySetInnerHTML={{__html: themeScript}} />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Toast.Provider placement="bottom" />
      </body>
    </html>
  );
}
