import Nav from "./Nav"
import Footer from "./Footer"
import Script from "next/script"
import Head from "next/head"
const Layout = ({ children, categories }) => {
  return (
    <>
      <Script
        data-ad-client="ca-pub-2090603078268650"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></Script>

      <Script
        id="ygoogle-analytics"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-Y4DN049NJG`}
      />

      <Script strategy="lazyOnload">
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
      <Nav categories={categories} />
      <main style={{ minHeight: "500px" }} className="main-layout">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
