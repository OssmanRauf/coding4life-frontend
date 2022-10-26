import Script from "next/script"
import Layout from "../components/Layout"
import App from "next/app"
import Head from "next/head"
import "bootstrap/dist/css/bootstrap.css"
import "../styles/globals.css"
import "react-dom"
import { info } from "../utils/tokens"
import { useEffect, useState } from "react"
function MyApp({ Component, pageProps }) {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
    const handler = async () => {
      const res = await fetch(`${info.baseUrl}/posts/categories`)
      res !== 200 ? setCategories([]) : ""
      const categories = await res.json()
      if (categories) {
        // const appProps = App.getInitialProps(appContext)
        setCategories(categories)
      }
    }
    handler()
  })

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Layout categories={categories}>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp

// MyApp.getInitialProps = async (appContext) => {}
