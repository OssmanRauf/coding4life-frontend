import Link from "next/link"
const NotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-div">
        <h3>Page not found</h3>
        <h6>
          Unfortunately the page you requested could not be found. Return to the
          <Link href="/">
            <a style={{ marginLeft: "5px" }}>Home page</a>
          </Link>
          .
        </h6>
      </div>
    </div>
  )
}

export default NotFound
