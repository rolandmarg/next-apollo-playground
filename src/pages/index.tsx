import NavBar from '../components/Navbar'
import { useViewerQuery } from '../__generated__/react-types.d'

export default function Home() {
  const { data, loading, error } = useViewerQuery()

  return (
    <div>
      <NavBar />
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      {data?.viewer && <p>{data.viewer.email}</p>}
    </div>
  )
}
