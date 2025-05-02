import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientRoot from './ClientRoot'

const inter = Inter({ subsets: ['latin'] });

// Importa los metadatos desde el archivo metadata.ts
import { metadata } from './metadata'
export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ClientRoot>
          {children}
        </ClientRoot>
      </body>
    </html>
  );
}