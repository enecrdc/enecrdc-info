import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ENECRDC.INFO - Info RDC, Bukavu, Sud-Kivu',
  description: 'Presse numerique generaliste - RDC, Bukavu, Sud-Kivu, provinces et international',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
