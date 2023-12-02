import Header from "@/components/header"
// import AppRoutes from "@/components/routes"
import Link from "next/link"
import Login from "@/auth/login/page"
import { AuthProvider } from "@/providers/auth-provider"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
      <div>
      
        { session ? (<h1> Olá </h1>) :  <Login/> }
      </div>

  )
}

