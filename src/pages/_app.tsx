import { AppProps } from 'next/app'
import '../styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return <Component {...pageProps} />
}

export default App
