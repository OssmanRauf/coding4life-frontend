import Link from "next/link"
import { useEffect, useState } from "react"
import { getAccessToken, getUserInfo, deleteTokens } from "../utils/tokens"
import { useRouter } from "next/router"
import Image from "next/image"
import logo from "../public/logo.png"
const Nav = ({ categories }) => {
  const categoriesList = categories
  const [accessToken, setAccessToken] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)
  const [search, setSearch] = useState("")
  const router = useRouter()

  function logOut() {
    deleteTokens()
    setAccessToken("")
    setIsAdmin(false)
    router.push("/login")
  }

  useEffect(() => {
    const handler = async () => {
      const accessToken_in = await getAccessToken()
      const userInfo = await getUserInfo()
      if (accessToken_in) {
        setAccessToken(accessToken_in)
        setIsAdmin(userInfo.isAdmin)
      }
    }
    handler()
  }, [])
  return (
    <nav className={"navbar navbar-expand-lg navbar-light bg-light"}>
      <div className={"container-fluid"}>
        <Link href="/">
          <a className={"navbar-brand navbar-logo"}>
            <Image
              // layout="fill"
              src={logo.src}
              width="150px"
              height="50px"
              alt=""
              srcSet=""
            />
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={"navbar-toggler-icon"}></span>
        </button>
        <div className={"collapse navbar-collapse"} id="navbarTogglerDemo01">
          <ul className={"navbar-nav me-auto mb-2 mb-lg-0"}>
            <li className={"nav-item mx-4"}>
              <Link href="/">
                <a
                  className={"dropdown-item nav-link fw-bold text-dark"}
                  aria-current="page"
                >
                  Home
                </a>
              </Link>
            </li>
            <li className={"nav-item mx-4"}>
              <Link href="/about">
                <a
                  className={"dropdown-item nav-link  fw-bold text-dark"}
                  href=""
                >
                  About
                </a>
              </Link>
            </li>
            <li className={"nav-item mx-4 dropdown"}>
              <a
                className={"nav-link dropdown-toggle fw-bold text-dark"}
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className={"dropdown-menu"} aria-labelledby="navbarDropdown">
                {categoriesList.map((categoryobj) => {
                  return (
                    <li
                      className={"dropdown-category"}
                      key={categoryobj.category}
                    >
                      <Link href={`/category/${categoryobj.category}`}>
                        <a className={"dropdown-item"} href="#">
                          {categoryobj.category}
                        </a>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>
            {accessToken ? (
              <li className={"nav-item mx-4"}>
                <Link href="/myprofile">
                  <a
                    className={"dropdown-item nav-link fw-bold text-dark"}
                    aria-current="page"
                  >
                    Myprofile
                  </a>
                </Link>
              </li>
            ) : null}
            {isAdmin ? (
              <li className={"nav-item mx-4"}>
                <Link href="/admin">
                  <a
                    className={"dropdown-item nav-link fw-bold text-dark"}
                    aria-current="page"
                  >
                    Admin
                  </a>
                </Link>
              </li>
            ) : null}
            <li className={"nav-item mx-4"}>
              {!accessToken ? (
                <Link href="/login">
                  <a className={"dropdown-item nav-link  fw-bold text-dark"}>
                    Login
                  </a>
                </Link>
              ) : (
                <button className="btn-logout" onClick={logOut}>
                  <a className={"dropdown-item nav-link  fw-bold text-dark"}>
                    Logout
                  </a>
                </button>
              )}
            </li>
            {!accessToken ? (
              <li className={"nav-item mx-4"}>
                <Link href="/sign-up">
                  <a
                    className={"dropdown-item nav-link fw-bold text-dark"}
                    aria-current="page"
                  >
                    SignUp
                  </a>
                </Link>
              </li>
            ) : null}
          </ul>
          <form
            className={"d-flex"}
            onSubmit={(e) => {
              e.preventDefault
            }}
          >
            <input
              className={"form-control me-2"}
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
              }}
            />
            <Link href={`/search/${search}`}>
              <button className={"btn btn-outline-success"} type="submit">
                {/* onClick={} */}
                Search
              </button>
            </Link>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default Nav
