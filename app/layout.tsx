import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const sukhumvitBold = localFont({
  src: "./fonts/Sukhumvit Set Bold.ttf",
  variable: "--font-sukhumvit-bold",
});

const sukhumvitRegular = localFont({
  src: "./fonts/Sukhumvit Set Font.ttf", 
  variable: "--font-sukhumvit-regular",
});

const sukhumvitSemiBold = localFont({
  src: "./fonts/Sukhumvit Set SemiBold.ttf",
  variable: "--font-sukhumvit-semibold",
});

export const metadata: Metadata = {
  title: "Congrets.me",
  description: "Congratulations card generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${sukhumvitRegular.variable} ${sukhumvitSemiBold.variable} ${sukhumvitBold.variable} font-sukhumvit antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
