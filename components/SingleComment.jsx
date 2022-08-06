import Link from "next/link"
import { info, getDateInfo } from "../utils/tokens"
import styles from "../styles/commentSection.module.css"

const SingleComment = ({ comment }) => {
  return (
    <div>
      <div className={`card mt-2 ${styles.comment_card}`}>
        <div className="card-body">
          <span className="card-head">
            <Link href={`/profile/${comment.User.username}`}>
              <a style={{ textDecoration: "none", color: "black" }}>
                <img
                  width="50"
                  src={`${info.baseUrl}/users/profile_pic/${comment.User.username}`}
                  style={{ borderRadius: "50%" }}
                />

                <h5 className="card-title">{comment.User.username}</h5>
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
