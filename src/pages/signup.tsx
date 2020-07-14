import Link from 'next/link'
import { FormEvent } from 'react'

import NavBar from '../components/Navbar'
import { useSignUpMutation } from '../__generated__/react-apollo.d'

export default function SignUp() {
  const [signUp, { loading, error }] = useSignUpMutation()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.elements.namedItem(
      'email'
    ) as HTMLInputElement
    const password = e.currentTarget.elements.namedItem(
      'password'
    ) as HTMLInputElement

    signUp({
      variables: { email: email.value, password: password.value },
    })
  }

  return (
    <>
      <NavBar />
      <div className="max-w-xs">
        {loading && <p> loading ...</p>}
        {error && <p> {error.message}</p>}
        <form onSubmit={handleSubmit} className="bg-white shadow-md m-4 p-4">
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            name="email"
            placeholder="Email"
            type="email"
            required
            autoComplete="on"
            autoFocus
            className="border border-black"
          />

          <label className="block" htmlFor="password">
            Password
          </label>
          <input
            name="password"
            placeholder="******"
            type="password"
            required
            className="border border-black"
          />

          <div className="flex justify-between pt-2">
            <button type="submit">sign up</button>
            <Link href="/signin">
              <a>sign in instead</a>
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}
