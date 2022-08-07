import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { getAccessToken, getUserInfo, info } from "../utils/tokens"
import loading from "../public/loading.gif"
import Modal from "../components/Modal"
export default function Myprofile({ posts, user }) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const [alertType, setAlertType] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [alertMessage, setAlertMessage] = useState("")
  const [accessToken, setAccessToken] = useState("")
  const [values, setValues] = useState({})

  useEffect(() => {
    const handler = async () => {
      const userInfo = await getUserInfo()
      const accessToken_in = await getAccessToken()
      setAccessToken(accessToken_in)
      if (!accessToken_in) {
        router.push("/login")
      } else if (userInfo.isAdmin) {
        setIsAdmin(true)
      }
    }
    handler()
    setValues({
      username: user.username,
      name: user.name,
      email: user.email,
      description: user.description,
    })
  }, [router, user])

  const closeModal = () => {
    setShowModal(false)
  }

  const flashingAlert = (message, type) => {
    setAlertMessage(message)
    setShowAlert(true)
    setTimeout(() => {
      setAlertMessage("")
      setShowAlert(false)
    }, 5000)
    setAlertType(type)
  }
  const addImage = async (img) => {
    setShowLoading(true)
    setShowModal(false)
    const form = new FormData()
    form.append("file", img, img.name)
    const res = await fetch(`${info.baseUrl}/users/add/profile`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: form,
    })
    const response = await res.json()
    if (res.status !== 201) {
      flashingAlert(response.detail, "danger")
    } else {
      flashingAlert(
        response.message + " refresh the page to see the changes",
        "success"
      )
    }
    setShowLoading(false)
  }

  const submitChanges = async () => {
    const verifyInputs = () => {
      if (
        user.username === values.username &&
        user.name === values.name &&
        user.email === values.email &&
        user.description === values.description
      ) {
        return false
      }
      return true
    }

    if (!verifyInputs()) {
      flashingAlert(
        "There was no change you can't submit without making changes",
        "danger"
      )
      setReadOnly(true)
      return false
    }
    const settings = {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
    setShowLoading(true)
    setReadOnly(true)

    const res = await fetch(`${info.baseUrl}/users/${user.id}`, settings)
    const response = await res.json()
    if (res.status !== 200) {
      flashingAlert(response.detail, "danger")
    } else {
      flashingAlert(
        "your informations have been updated refresh the page to see the changes",
        "success"
      )
    }

    setShowLoading(false)
  }
  const deleteImage = async () => {
    const settings = {
      method: "PUT",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
    const res = await fetch(`${info.baseUrl}/users/delete/profile`, settings)
    const response = await res.json()
    if (res.status !== 201) {
      flashingAlert(response.detail, "danger")
    }
    flashingAlert(
      "Profile image deleted refresh the page to see the changes",
      "success"
    )
    setShowModal(false)
  }

  const requestAdmin = async () => {
    setShowLoading(true)

    const settings = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
    const res = await fetch(`${info.baseUrl}/users/request-admin`, settings)
    const response = await res.json()
    if (res.status !== 201) {
      flashingAlert(response.detail, "danger")
    } else {
      flashingAlert(response.message, "success")
    }

    setShowLoading(false)
  }

  const myLoader = () => {
    return `${info.baseUrl}/users/profile_pic/${user.username}`
  }
  return (
    <div className="my-profile">
      {showLoading ? (
        <div className="full-container">
          <Image
            // layout="fill"
            height="100%"
            width="20%"
            className="loading"
            src={loading.src}
            alt=""
          />
        </div>
      ) : null}
      <div className="my-info">
        {showAlert ? (
          <div
            style={{ textAlign: "center" }}
            className={`alert alert-${alertType}`}
          >
            {alertMessage}
          </div>
        ) : null}
        {showModal ? (
          <Modal
            closeModal={closeModal}
            addImage={addImage}
            deleteImage={deleteImage}
          />
        ) : null}
        <button className="image-profile" onClick={() => setShowModal(true)}>
          <Image
            loader={myLoader}
            className="image-profile"
            src={`${info.baseUrl}/users/profile_pic/${user.username}`}
            width="150px"
            height="150px"
            alt=""
          />
        </button>
        <div className="inputs-user-info">
          <div className="input-span">
            <p className="label-input" placeholder="Username">
              Username:
            </p>
            <input
              type="text"
              defaultValue={values.username}
              readOnly={readOnly}
              onChange={(e) => {
                const obj = values
                obj.username = e.target.value
                setValues(obj)
              }}
            />
          </div>
          <div className="input-span">
            <p className="label-input">Full name: </p>
            <input
              type="text"
              placeholder="Full name"
              defaultValue={values.name}
              readOnly={readOnly}
              onChange={(e) => {
                const obj = values
                obj.name = e.target.value
                setValues(obj)
              }}
            />
          </div>
          <div className="input-span">
            <p className="label-input">Email: </p>
            <input
              type="text"
              placeholder="Email"
              defaultValue={values.email}
              readOnly={readOnly}
              onChange={(e) => {
                const obj = values
                obj.email = e.target.value
                setValues(obj)
              }}
            />
          </div>
          <div className="input-span">
            <p className="label-input">Bio: </p>
            <textarea
              type="text"
              placeholder="Description"
              defaultValue={values.description}
              className="input-bio"
              readOnly={readOnly}
              onChange={(e) => {
                const obj = values
                obj.description = e.target.value
                setValues(obj)
              }}
            />
          </div>
        </div>
        <div className="btn-container">
          {readOnly ? (
            <button
              onClick={() => setReadOnly(false)}
              className="btn btn-primary button-change-submit"
            >
              Edit info
            </button>
          ) : (
            <button
              onClick={submitChanges}
              className="btn btn-primary button-change-submit"
            >
              Submit
            </button>
          )}
          {!isAdmin ? (
            <button
              onClick={requestAdmin}
              className="btn btn-secondary button-request-admin"
            >
              Request to be Admin
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    const accessToken = context.req.cookies.accessToken
    if (!accessToken) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      }
    } else {
      const settings = {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const resUser = await fetch(`${info.baseUrl}/users/myprofile`, settings)
      const user_response = await resUser.json()
      const user = user_response

      // will receive `posts` as a prop at build time
      return {
        props: {
          user,
        },
      }
    }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }
  }
}
// Call an external API endpoint to get posts.
