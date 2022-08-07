import Link from "next/link"
import { info, getDateInfo } from "../utils/tokens"
import styles from "../styles/commentSection.module.css"
import Image from "next/image"
const SingleComment = ({ comment }) => {
  const myLoader = () => {
    return `${info.baseUrl}/users/profile_pic/${comment.User.username}`
  }
  return (
    <div>
      <div className={`card mt-2 ${styles.comment_card}`}>
        <div className="card-body">
          <span className="card-head">
            <Link href={`/profile/${comment.User.username}`}>
              <a
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <Image
                  width="50px"
                  height="50px"
                  src={`${info.baseUrl}/users/profile_pic/${comment.User.username}`}
                  style={{ borderRadius: "50%" }}
                  loader={myLoader}
                  alt=""
                />

                <h5 style={{ paddingLeft: "15px" }} className="card-title">
                  {comment.User.username}
                </h5>
              </a>
            </Link>
            <p className={`${styles.comment_date}`}>
              {`${getDateInfo(comment.Comment.commented_at)}`}
            </p>
          </span>
          <p className={`card-text ${styles.text_card}`}>
            {comment.Comment.content}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SingleComment
