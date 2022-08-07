import { useRouter } from "next/router"
import { useEffect } from "react"
import { getAccessToken, getUserInfo, info } from "../../utils/tokens"
import Link from "next/link"
import ListArticles from "../../components/ListArticles"
import GoogleAds from "../../components/GoogleAds"
const Index = ({ posts }) => {
  const router = useRouter()
  useEffect(() => {
    const handler = async () => {
      const userInfo = await getUserInfo()
      const accessToken = await getAccessToken()
      if (!accessToken) {
        router.push("/login")
      } else if (userInfo.isAdmin === false) {
        router.push("/")
      }
    }
    handler()
  }, [router])

  return (
    <>
      <div className="container admin-panel-container">
        <div className="tittle-profile">
          <h1>Admin Panel</h1>
          <Link href="/myprofile">
            <a className="btn btn-info btn-check-profile">My profile</a>
          </Link>
        </div>
        <h1 className="tittle-admin-posts">Your posts</h1>
        <ListArticles isAdmin={true} articles={posts} />
        <Link href="/admin/article/create-article">
          <div className="new-post-btn">
            <button
              className="btn btn-primary btn-lg add-post-btn"
              type="submit"
            >
              +
            </button>
          </div>
        </Link>
      </div>
      <GoogleAds currentPath={"adminPage"} />
    </>
  )
}

export default Index

export async function getServerSideProps(context) {
  const { page } = context.query
  const { req } = context
  if (req.cookies.accessToken) {
    const accessToken = req.cookies.accessToken
    // Call an external API endpoint to get posts.
    const resp = await fetch(`${info.baseUrl}/posts/user`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const posts = await resp.json()

    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
    }
  } else {
    return {
      props: {
        posts: [],
      },
    }
  }
}
