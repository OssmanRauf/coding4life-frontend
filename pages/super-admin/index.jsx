import { useRouter } from "next/router"
import AdminRequestList from "../../components/AdminRequestList"
import { getAccessToken, info, getUserInfo } from "../../utils/tokens"
import { useEffect, useState } from "react"

const index = () => {
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

      const fetchRequests = async () => {
        const res = await fetch(`${info.baseUrl}/admin/requests_for_admin`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJpc19hZG1pbiI6dHJ1ZSwiaXNfc3VwZXJfdXNlciI6dHJ1ZSwiZXhwIjoxNjU5NzE2NjU2LCJzY29wZSI6ImFjY2VzcyB0b2tlbiJ9.-TGF6KFCozOOvufjWieZmFW0POUDKd9d3-b8FBnxhgQ`,
          },
        })
        const response = await res.json()
        setAdminRequest(response)
      }
      fetchRequests()
    }
    handler()
  }, [])

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
        showLoading={showLoading}
        adminRequest={adminRequest}
        acceptRequest={acceptRequest}
        denyRequest={denyRequest}
      />
    </>
  )
}

export default index
