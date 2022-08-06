import { useEffect } from "react"

const GoogleAds = (...props) => {
  const { currentPath } = props
  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || []
    window.adsbygoogle.push({})
  }, [currentPath])
  return (
    <div key={currentPath}>
      <ins
        class="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-9791181696156091"
        data-ad-slot="1436333349"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  )
}

export default GoogleAds
