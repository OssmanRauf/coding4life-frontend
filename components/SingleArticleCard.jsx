import Link from "next/link"
import styles from "../styles/listArticles.module.css"
import { getAccessToken, info } from "../utils/tokens"
import { useRouter } from "next/router"
import Image from "next/image"
const SingleArtile = ({ object, isAdmin, setShowAlert }) => {
  const router = useRouter()

  const deletePost = async (id) => {
    const accessToken = await getAccessToken()
    const setings = {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const res = await fetch(`${info.baseUrl}/posts/${id}`, setings)
    if (res.status === 204) {
      setShowAlert(true)
      setTimeout(() => {
        setShowAlert(false)
        router.push("/admin")
      }, 2000)
    }
  }
  if (isAdmin) {
    return (
      <div className="card card-post-box">
        <div className="card-body">
          <h5 className="card-title">{object.title}</h5>
          <p className="card-text">{object.description}</p>
          <div className="admin-btn-post">
            <Link href={`/articles/slug/${object.slug}`}>
              <a className="btn btn-primary">Read article</a>
            </Link>
            <Link href={`/admin/article/edit/${object.slug}`}>
              <a className="btn btn-secondary">Edit article</a>
            </Link>
            {/* <Link href={`/admin/article/edit/${object.slug}`}> */}
            <button
              className="btn btn-danger"
              onClick={() => {
                deletePost(object.id)
              }}
            >
              delete article
            </button>
          </div>
        </div>
      </div>
    )
  }

  const myLoader = () => {
    return `${info.baseUrl}/users/profile_pic/${object.User.username}`
  }
  return (
    <div className={`card ${styles.card_post_box}`}>
      <div className="card-header">
        <Link href={`/profile/${object.User.username}`}>
          <Image
            width="50px"
            height="50px"
            loader={myLoader}
            alt=""
            src={`${info.baseUrl}/users/profile_pic/${object.User.username}`}
          />
        </Link>

        <Link href={`/profile/${object.User.username}`}>
          <a style={{ paddingLeft: "15px" }}>{object.User.username}</a>
        </Link>
      </div>
      <div className="card-body">
        <h5 className="card-title">{object.Post.title}</h5>
        <p className="card-text">{object.Post.description}</p>

        <Link href={`/articles/slug/${object.Post.slug}`}>
          <a className="btn btn-primary">Read article</a>
        </Link>
      </div>
    </div>
  )
}

export default SingleArtile
