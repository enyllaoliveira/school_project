import { AuthProvider } from '@/providers/auth-provider'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <AuthProvider> 
    <Html lang="en">
    <Head />
    <body>
    <Main />
    <NextScript />
    </body>
  </Html></AuthProvider>
    
  )
}
