import Nav from "./Nav"
import Footer from "./Footer"
import Script from "next/script"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import loading from "../public/loading.gif"
const Layout = ({ children, categories }) => {
  const router = useRouter()
  const [showLoading, setShowLoading] = useState(false)
  // const
  useEffect(() => {
    const handleStart = (url) => setShowLoading(true)
    const handleComplete = (url) => setShowLoading(false)
    router.events.on("routeChangeStart", handleStart)
    router.events.on("routeChangeComplete", handleComplete)
    router.events.on("routeChangeError", handleComplete)

    return () => {
      router.events.off("routeChangeStart", handleStart)
      router.events.off("routeChangeComplete", handleComplete)
      router.events.off("routeChangeError", handleComplete)
      // setShowLoading(false)
    }
  })

  return (
    <>
      <Script
        data-ad-client="ca-pub-2090603078268650"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></Script>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-Y4DN049NJG`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-Y4DN049NJG', {
                    page_path: window.location.pathname,
                    });
                `}
      </Script>
      <Head>
        {/* <Script> */}
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />

        {/* </Script> */}
      </Head>
      {showLoading ? (
        <div className="router-loading">
          <Image
            // layout="fill"
            height="100%"
            width="100%"
            // className="loading"
            style={{ margin: "auto" }}
            src={loading.src}
            alt=""
          />
        </div>
      ) : (
        ""
      )}

      <Nav categories={categories} />
      <main style={{ minHeight: "500px" }} className="main-layout">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
