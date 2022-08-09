import { info, getAccessToken } from "../../utils/tokens"
import { useEffect, useState } from "react"
import SuperAdminUserCard from "../../components/SuperAdminUserCard"
import ModalConfirmation from "../../components/ModalConfirmation"
// import {getAccessToken} from "../.."
const Users = ({ users }) => {
  const [accessToken, setAccessToken] = useState("")
  const [usersState, setUsersState] = useState(users)
  const [showModal, setShowModal] = useState(false)
  const [deleteId, setDeleteId] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const closeModal = () => {
    setShowModal(false)
    setDeleteId("")
  }
  const handleShowModal = () => {
    setShowModal(true)
  }
  useEffect(() => {
    const handler = async () => {
      const accessTokenin = await getAccessToken()
      if (!accessTokenin) {
        router.push("/login")
      }
      setAccessToken(accessTokenin)
    }
    handler()
  })

  const deleteUser = async () => {
    // log
    const setings = {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      },
    }

    const res = await fetch(`${info.baseUrl}/users/?id=${deleteId}`, setings)
    if (res.status !== 204) {
      const response = await res.json()
      setAlertMessage(response.detail)
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        setAlertMessage("")
      }, 2000)
    } else {
      const newUserList = usersState.filter((user) => user.id !== deleteId)
      setUsersState(newUserList)
    }
    closeModal()
  }

  return (
    <>
      <div className="super-admin-users">
        {showAlert ? (
          <div
            style={{ textAlign: "center", width: "100%", marginBottom: "0" }}
            className={`alert alert-danger`}
          >
            {alertMessage}
          </div>
        ) : null}
        {showModal ? (
          <ModalConfirmation closeModal={closeModal} deleteUser={deleteUser} />
        ) : null}
        <>
          {usersState.map((user) => {
            return (
              <SuperAdminUserCard
                handleShowModal={handleShowModal}
                setDeleteId={setDeleteId}
                key={user.id}
                user={user}
              />
            )
          })}
        </>
      </div>
    </>
  )
}

export default Users

export async function getServerSideProps(context) {
  const { req } = context
  if (req.cookies.accessToken) {
    const accessToken = req.cookies.accessToken
    // Call an external API endpoint to get posts.
    const request = await fetch(`${info.baseUrl}/users/`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    let users
    if (request.status !== 200) {
      users = false
    } else {
      users = await request.json()
    }
    return {
      props: {
        users,
      },
    }
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    }
  }
}
