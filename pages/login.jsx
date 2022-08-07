import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import {
  storeAccessToken,
  storeRefreshToken,
  info,
  getAccessToken,
} from "../utils/tokens"

const Login = () => {
  const [showAlert, setShowAlert] = useState(false)
  const router = useRouter()
  useEffect(() => {
    const getToken = async () => {
      const accessToken = await getAccessToken()
      if (accessToken) {
        router.push("/")
      }
    }
    getToken()
  }, [router])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const username = event.target[0].value
    const password = event.target[1].value

    const res = await fetch(`${info.baseUrl}/login`, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      body: new URLSearchParams({
        username: username,
        password: password,
      }),
    })
    if (res.status === 200) {
      const data = await res.json()
      storeAccessToken(data.access_token)
      storeRefreshToken(data.refresh_token, {
        isAdmin: data.is_admin,
        isSuperAdmin: data.is_super_user,
      })
      router.push("/")
    } else {
      setShowAlert(true)
      event.target[0].value = ""
      event.target[1].value = ""
      setTimeout(() => {
        setShowAlert(false)
      }, 5000)
    }
  }

  return (
    <>
      <div className="container login-box">
        {showAlert ? (
          <div className="alert alert-danger">Invalid username or password</div>
        ) : null}
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <Link href="/sign-up">
          <a className="link-register">
            Click here if you don&apos;t have an account
          </a>
        </Link>
      </div>
    </>
  )
}

export default login
