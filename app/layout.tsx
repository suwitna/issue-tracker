import { AuthProvider } from './Providers';
import '@radix-ui/themes/styles.css';
import './theme-config.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Theme, ThemePanel } from '@radix-ui/themes';
import NavBar from './NavBar';
import Footer from './components/Footer';

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
            <NavBar />
              <main className='p-6 my-10'> 
                  {children}
              </main>
            </AuthProvider>
          </Theme>
          <Footer />
        </body>
    </html>
  );
}
