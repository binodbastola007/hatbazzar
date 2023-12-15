import './globals.css'
import { Inter } from 'next/font/google';
import { Providers } from "./GlobalRedux/provider";
import Authprovider from './components/Authprovider/Authprovider';


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/crypto-js.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/hmac-sha256.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.9-1/enc-base64.min.js"></script>
      </head>
      <body className={inter.className}>
        <Providers>
          <Authprovider>
            {children}
          </Authprovider>
        </Providers>
      </body>
    </html>
  )
}
