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
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap")
  })

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp

// MyApp.getInitialProps = async (appContext) => {}
