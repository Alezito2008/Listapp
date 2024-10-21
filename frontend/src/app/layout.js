import "./globals.css";
import "@/styles/iconSize.css"
import Menu from "@/components/Menu/Menu";

export default function RootLayout({ children }) {

  return (
    <html lang="es">
      <head>
        <title>Listapp</title>
        <meta name="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <Menu />
        <div className="main-content">{children}</div>
      </body>
    </html>
  );
}