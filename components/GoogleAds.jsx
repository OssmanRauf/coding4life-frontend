import { useEffect } from "react"
// import Head from "next/head"
import Script from "next/script"
const GoogleAds = (...props) => {
  const { currentPath } = props
  if (typeof window !== "undefined") {
    try {
      return (
        <div key={currentPath}>
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client="ca-pub-9791181696156091"
            data-ad-slot="1436333349"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          <Script>{(adsbygoogle = window.adsbygoogle || []).push({})}</Script>
        </div>
      )
    } catch (e) {}
  }
}

export default GoogleAds
