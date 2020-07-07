import Link from 'next/link'

export default function NavBar(): JSX.Element {
  return (
    <header>
      <nav className="flex p-4">
        <Link href="/" passHref>
          <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
            Home
          </a>
        </Link>
        <Link href="/schedule" passHref>
          <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
            Schedule a call
          </a>
        </Link>
        <Link href="/apply" passHref>
          <a className="focus:outline-none bg-orange-500 text-2xl text-white m-2 py-2 px-4 rounded">
            Apply
          </a>
        </Link>
      </nav>
    </header>
  )
}
