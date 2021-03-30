import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Provider } from 'react-redux';

import { useStore } from '../store';
import Header from '../components/Header';
import '../styles/global.css';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

function App({ Component, pageProps }) {
  const store = useStore(pageProps.preloadedState);

  return <>
    <style jsx global>{`
      #nprogress {
        pointer-events: none;
      }
      #nprogress .bar {
        position: fixed;
        z-index: 1031;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #1d66bf;
      }
    `}</style>

    <Head>
      <title>Delta</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no"/>
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png"/>
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>

    <Provider store={store}>
      <Header/>
      <Component {...pageProps}/>
    </Provider>
  </>;
}

export default App;
