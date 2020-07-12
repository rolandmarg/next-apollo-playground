import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { ViewerQuery, ViewerQueryVariables } from '../__generated__/types'
import NavBar from '../components/Navbar'

const VIEWER = gql`
  query Viewer {
    viewer {
      id
      email
    }
  }
`

export default function Home() {
  const { data, loading, error } = useQuery<ViewerQuery, ViewerQueryVariables>(
    VIEWER
  )
  return (
    <div>
      <NavBar />
      {loading && <p>loading...</p>}
      {error && <p>{error.message}</p>}
      {data?.viewer && <p>{data.viewer.email}</p>}
    </div>
  )
}
