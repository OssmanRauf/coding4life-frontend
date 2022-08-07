import Nav from "./Nav"
import Footer from "./Footer"
import Script from "next/script"
import Head from "next/head"
const Layout = ({ children, categories }) => {
  return (
    <>
      <Head>
        {/* <Script> */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9791181696156091"
          crossOrigin="anonymous"
        ></script>
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
