import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Listapp",
  description: "Crea tus propias listas",
};

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <head>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={inter.className}>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
