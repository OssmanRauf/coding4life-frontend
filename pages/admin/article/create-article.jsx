import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import ArticleForm from "../../../components/ArticleForm"
import { getAccessToken, getUserInfo, info } from "../../../utils/tokens"
const CreateArticle = () => {
  const [accessToken, setAccessToken] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")

  const router = useRouter()
  useEffect(() => {
    const handler = async () => {
      const userInfo = await getUserInfo()
      const accessToken = await getAccessToken()
      if (accessToken === null) {
        router.push("/login")
      } else {
        if (userInfo.isAdmin === false) {
          router.push("/")
        }
      }
      setAccessToken(accessToken)
    }
    handler()
  }, [router])

  const handleSubmit = async ({
    title,
    category,
    description,
    content,
    publish,
    header_img,
  }) => {
    const settings = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        content: content,
        published: publish,
        category: category,
        description: description,
        header_img: header_img,
      }),
    }
    const res = await fetch(`${info.baseUrl}/posts/`, settings)
    const response = await res.json()

    if (res.status !== 201) {
      setShowAlert(true)
      setAlertMessage(response.details)
      setTimeout(() => {
        setShowAlert(false)
      }, 2000)
    } else {
      router.push("/admin")
    }
  }

  return (
    <>
      {showAlert ? (
        <div className="alert alert-danger fixed-top m-4">{alertMessage}</div>
      ) : null}
      <ArticleForm handleSubmit={handleSubmit} accessToken={accessToken} />
    </>
  )
}

export default CreateArticle
