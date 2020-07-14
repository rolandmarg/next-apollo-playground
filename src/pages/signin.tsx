import { FormEvent } from 'react'
import { useRouter } from 'next/router'

import NavBar from '../components/Navbar'
import { useSignInMutation } from '../__generated__/react-apollo.d'

export default function SignIn() {
  const router = useRouter()
  const [signIn, { error, loading, client }] = useSignInMutation({
    onCompleted: async (data) => {
      const token = data.signIn.token

      if (token) {
        localStorage.setItem('token', token)
        await client?.resetStore()
        router.push('/')
      }
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.elements.namedItem(
      'email'
    ) as HTMLInputElement
    const password = e.currentTarget.elements.namedItem(
      'password'
    ) as HTMLInputElement

    signIn({
      variables: { email: email.value, password: password.value },
    })
  }

  return (
    <>
      <NavBar />
      <div className="max-w-xs">
        {loading && <p>loading...</p>}
        {error && <p>{error.message}</p>}
        <form className="shadow rounded" onSubmit={handleSubmit}>
          <label className="block" htmlFor="email">
            email
          </label>
          <input
            name="email"
            className="border border-black"
            placeholder="Email"
            type="email"
            autoFocus
            autoComplete="on"
            required
          />
          <label className="block" htmlFor="password">
            password
          </label>
          <input
            name="password"
            className="border border-black"
            placeholder="*****"
            type="password"
            required
          />
          <div className="p-2 flex justify-between">
            <button type="submit">sign in</button>
            <button>forgot password?</button>
          </div>
        </form>
      </div>
    </>
  )
}
