import './globals.css';
import 'leaflet/dist/leaflet.css';
import { Manrope } from 'next/font/google';
import Providers from '../components/Providers';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SmoothScroll from '../components/SmoothScroll';

const manrope = Manrope({ subsets: ['latin'], display: 'swap' });

export const metadata = {
  title: { default: 'DemoStay | Apartments in Pokhara, Nepal', template: '%s | DemoStay' },
  description: 'Hand-picked apartments in Pokhara with Phewa Lake and Annapurna views (demo website with sample content).',
};
export const viewport = { width: 'device-width', initialScale: 1, themeColor: '#ffffff' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <Providers>
          <SmoothScroll />
          <a href="#main" className="skip">Skip to content</a>
          <Header />
          <div id="main" className="page">{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
