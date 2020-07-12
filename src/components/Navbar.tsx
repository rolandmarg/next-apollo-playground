import Link from 'next/link'

export default function NavBar() {
  return (
    <header>
      <nav className="flex p-4">
        <Link href="/">
          <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
            Home
          </a>
        </Link>
        <Link href="/schedule-meeting">
          <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
            Schedule a call
          </a>
        </Link>
        <Link href="/apply">
          <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
            Apply
          </a>
        </Link>
        <Link href="/signin">
          <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
            Sign in
          </a>
        </Link>
        <Link href="/signup">
          <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
            Sign up
          </a>
        </Link>
        <Link href="/signout">
          <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
            Sign out
          </a>
        </Link>
      </nav>
    </header>
  )
}
