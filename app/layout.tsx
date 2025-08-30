import { AuthProvider } from './Providers';
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme, ThemePanel } from '@radix-ui/themes';
import NavBar from './NavBar';
import Footer from './components/Footer';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "จองทริปเดินป่าน้ำตกเหวอีอ่ำ",
  description: "ระบบจองทริปเดินป่าน้ำตกเหวอีอ่ำ(ไปเช้า-กลับเนย็น)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme accentColor="indigo">
          <AuthProvider>
          <Suspense fallback={<Loading />}>
            <NextTopLoader
              color="#2299DD"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={true}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD"
              template='<div class="bar" role="bar"><div class="peg"></div></div>'
              zIndex={1600}
              showAtBottom={false}
            />
              <NavBar />
                <main className='p-6 my-10'> 
                    {children}
                </main>
              </Suspense>
            </AuthProvider>
          </Theme>
          <Footer />
        </body>
    </html>
  );
}
