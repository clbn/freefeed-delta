import Head from 'next/head';
import Header from '../components/Header';

function App({ Component, pageProps }) {
  return <>
    <Head>
      <title>Delta</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
      <link rel="icon" href="data:,"/>
    </Head>

    <Header/>

    <Component {...pageProps}/>
  </>;
}

export default App;
