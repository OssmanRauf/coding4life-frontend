import Nav from "./Nav"
import Footer from "./Footer"
import Script from "next/script"
import Head from "next/head"
const Layout = ({ children, categories }) => {
  return (
    <>
      <Head>
        <Script>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9791181696156091"
            crossorigin="anonymous"
          ></script>
        </Script>
      </Head>
      <main className="main-layout">
        <Nav categories={categories} />
        {children}
        <Footer />
      </main>
    </>
  )
}

export default Layout
