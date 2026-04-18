import Providers from "@/providers/Providers";
import "./globals.css";
import Logo from "@/components/Logo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased`}>
      <body className="min-h-full flex flex-col relative">
        <Logo />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
