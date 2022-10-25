import CommentSection from "./CommentSection"
import styles from "../styles/readArticle.module.css"
import { getDateInfo } from "../utils/tokens"
import Link from "next/link"

const ReadPost = ({ post, comments, username }) => {
  return (
    <div>
      <div className={`${styles.article_container}`}>
        <div className={`${styles.article}`}>
          <h3 className={`${styles.article_title}`}>{post.title}</h3>
          <p style={{ margin: 0, fontSize: "12px" }}>
            Created:
            <span style={{ marginLeft: 10, marginRight: 10 }}>
              {getDateInfo(post.created_at)}
            </span>
            by
            <Link href={`/profile/${username}`}>
              <a style={{ paddingLeft: "15px" }}>{username}</a>
            </Link>
          </p>
          {/* <p style={{ marginTop: 0, fontSize: "12px" }}>
            Last updated:
            <span style={{ marginLeft: 10 }}>
              {getDateInfo(post.updated_at)}
            </span>
          </p> */}
          <div
            className={`${styles.article_content}`}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>
      <div className={`${styles.comment_section}`}>
        <CommentSection comments={comments} postId={post.id} />
      </div>
    </div>
  )
}

export default ReadPost
