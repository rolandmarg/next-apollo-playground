import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useApolloClient } from '@apollo/client'

export default function SignOut() {
  const client = useApolloClient()
  const router = useRouter()

  useEffect(() => {
    const signOut = async () => {
      localStorage.clear()
      await client.resetStore()
      router.push('/')
    }

    signOut()
  }, [router, client])

  return <p>Signing out...</p>
}
