import Head from 'next/head';
import { Provider } from 'react-redux';

import { useStore } from '../store';
import IconDefinitions from '../components/IconDefinitions';
import Header from '../components/Header';
import '../styles/global.css';

function App({ Component, pageProps }) {
  const store = useStore(pageProps.preloadedState);

  return <>
    <Head>
      <title>Delta</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <IconDefinitions/>

    <Provider store={store}>
      <Header/>
      <Component {...pageProps}/>
    </Provider>
  </>;
}

export default App;
