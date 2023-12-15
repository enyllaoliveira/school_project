import { useSession } from "next-auth/react"
import Login from "./api/auth/signin/page"
import { useRouter } from "next/router";

export default function Home() {
  const { data: session } = useSession()
  const router = useRouter();
  const isUser = !!session?.user;

  return (
    <div>
      {!isUser && <Login />}
    </div>
  )
}



