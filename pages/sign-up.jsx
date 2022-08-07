import React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { getAccessToken, info } from "../utils/tokens"
import loading from "../public/loading.gif"

import { useRouter } from "next/router"
const Signup = () => {
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  const [alertType, setAlertType] = useState("")
  const [showLoading, setShowLoading] = useState(false)
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

  const flashingAlert = (message, type = "danger") => {
    setAlertMessage(message)
    setAlertType(type)
    setShowAlert(true)
    setTimeout(() => {
      setShowAlert(false)
      setAlertMessage("")
    }, 5000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const cleanForm = () => {
      e.target[0].value = ""
      e.target[1].value = ""
      e.target[2].value = ""
      e.target[3].value = ""
      e.target[4].value = ""
    }
    const email = e.target[0].value
    const username = e.target[1].value
    const name = e.target[2].value
    const password = e.target[3].value
    const passConfirmation = e.target[4].value
    if (password !== passConfirmation) {
      cleanForm()
      flashingAlert("Passwords don't match")
      return
    }
    setShowLoading(true)

    const res = await fetch(`${info.baseUrl}/users/`, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        name: name,
        password: password,
      }),
    })
    const response = await res.json()
    setShowLoading(false)
    if (res.status !== 201) {
      flashingAlert(response.detail)
    }
    if (response.email) {
      flashingAlert("Registration successful", "success")
      router.push("/login")
    }
  }
  return (
    <div className="sign-up-container">
      {showLoading ? (
        <div className="full-container">
          <Image
            // layout="fill"
            height="100%"
            width="100%"
            className="loading"
            src={loading.src}
            alt="Loading..."
          />
        </div>
      ) : null}
      <div className="container">
        {showAlert ? (
          <div className={`alert alert-${alertType}`}>{alertMessage}</div>
        ) : null}
        <form onSubmit={handleSubmit} className="mb-3 sign-up-form">
          <div className="mb-3 form-span">
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
          <div className="mb-3 form-span">
            <label htmlFor="username" className="form-label">
              Choose a Username
            </label>
            <input type="text" className="form-control" id="username" />
            <div id="emailHelp" className="form-text">
              This will be how your readers will find you and your articles.
            </div>
          </div>
          <div className="mb-3 form-span">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3 form-span">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 form-span">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Confirm password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
            />
          </div>
          <div className="mb-3 form-span">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
      <Link href="/login">
        <a className="link-login">If you already have an account click here</a>
      </Link>
    </div>
  )
}

export default Signup
