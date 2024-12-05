import localFont from "next/font/local";
import "./globals.css";
import icon from "../../public/images/log0_page-0001.jpg";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/images/log0_page-0001.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="refresh" content="1000" />
        <title>Egypt Logistics</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        style={{ paddingRight: 0 }}
      >
        {children}
      </body>
    </html>
  );
}
