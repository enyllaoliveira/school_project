import { SessionProvider } from 'next-auth/react'
import { CookiesProvider } from 'react-cookie'

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  return (
    <SessionProvider>
       <CookiesProvider>
         {children}
        </CookiesProvider>
      </SessionProvider>
  )
}