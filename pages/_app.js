import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import Header from '../components/Header';
import '../styles/global.css';

NProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeComplete', NProgress.done);
Router.events.on('routeChangeError', NProgress.done);

function App({ Component, pageProps }) {
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
      <link rel="icon" href="data:,"/>
    </Head>

    <Header/>

    <Component {...pageProps}/>
  </>;
}

export default App;
