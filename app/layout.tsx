import "./globals.css";
import React from 'react'
import Provider from "../components/Providers";
import { Toaster } from "react-hot-toast";
import ToastProvider from "../context/ToastProvider";

interface Props {
  children: React.ReactNode;
}

export const metadata = {
  title: "Snapgram",
  description: "A leading social media platform",
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-[#13131a]">
        <Toaster />
        <Provider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </Provider>
      </body>
    </html>
  )
}
