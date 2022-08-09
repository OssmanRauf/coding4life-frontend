import { useRouter } from "next/router"
import AdminRequestList from "../../components/AdminRequestList"
import { getAccessToken, info, getUserInfo } from "../../utils/tokens"
import { useEffect, useState } from "react"

const AdminRequestPage = ({ requests }) => {
  const router = useRouter()
  const [accessTokenState, setAccessTokenState] = useState("")
  const [showLoading, setShowLoading] = useState(false)
  const [adminRequest, setAdminRequest] = useState([])
  useEffect(() => {
    const handler = async () => {
      const userInfo = await getUserInfo()
      const accessToken = await getAccessToken()

      if (!accessToken) {
        router.push("/login")
      } else if (userInfo.isSuperAdmin === false) {
        router.push("/")
      }
      setAccessTokenState(accessToken)
      if (!requests) {
        router.push("/")
      } else {
        setAdminRequest([...requests])
        console.log(requests)
      }
    }
    handler()
  }, [router, requests])

  const acceptRequest = async (id) => {
    setShowLoading(true)
    const res = await fetch(`${info.baseUrl}/admin/accept_request?id=${id}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessTokenState}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: id,
      }),
    })
    const newRequestList = adminRequest.filter((value) => {
      return value.AdminRequest.id !== id
    })
    setAdminRequest(newRequestList)
    setShowLoading(false)
  }

  const denyRequest = async (id) => {
    setShowLoading(true)
    const res = await fetch(`${info.baseUrl}/admin/deny_request?id=${id}`, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessTokenState}`,
        "Content-Type": "application/json",
      },
    })
    const newRequestList = adminRequest.filter((value) => {
      return value.AdminRequest.id !== id
    })
    setAdminRequest(newRequestList)
    setShowLoading(false)
  }
  return (
    <>
      <AdminRequestList
        // requests={requests}
        showLoading={showLoading}
        adminRequest={adminRequest}
        acceptRequest={acceptRequest}
        denyRequest={denyRequest}
      />
    </>
  )
}

export default AdminRequestPage

export async function getServerSideProps(context) {
  const { req } = context
  if (req.cookies.accessToken) {
    const accessToken = req.cookies.accessToken
    // Call an external API endpoint to get posts.
    const request = await fetch(`${info.baseUrl}/admin/requests_for_admin`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
    let requests
    if (request.status !== 200) {
      requests = false
    } else {
      requests = await request.json()
    }
    return {
      props: {
        requests,
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
