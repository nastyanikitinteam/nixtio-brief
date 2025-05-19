import { Epilogue } from "next/font/google";

import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

import { Toaster } from "react-hot-toast";

import "../styles/reset.scss";
import "./globals.scss";
import "../styles/typography.scss";

export const metadata = {
  title: "Nixtio Brief",
  description: `For us to start your project, we need minimal information from you.
  Answering the questions in this brief will give you a better understanding of your project`,
};

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={epilogue.variable}>
        <Header />
        {children}
        <Footer />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
