import Script from "next/script"
import Layout from "../components/Layout"
import App from "next/app"
import Head from "next/head"
import "../styles/globals.css"
import "react-dom"
import { info } from "../utils/tokens"
function MyApp({ Component, pageProps, categories }) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-0Z799QJ9ZZ`}
      />

      <Script strategy="lazyOnload">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-0Z799QJ9ZZ', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>
      <Layout categories={categories}>
        <Component {...pageProps} />
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
          crossorigin="anonymous"
        ></Script>
      </Layout>
    </>
  )
}

export default MyApp

MyApp.getInitialProps = async (appContext) => {
  const res = await fetch(`${info.baseUrl}/posts/categories`)
  const categories = await res.json()
  if (categories) {
    const appProps = App.getInitialProps(appContext)
    return { ...appProps, categories: categories }
  }
}