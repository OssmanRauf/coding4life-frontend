import CommentSection from "./CommentSection"
import styles from "../styles/readArticle.module.css"
const ReadPost = ({ post, comments }) => {
  return (
    <div>
      <div className={`${styles.article_container}`}>
        <div className={`${styles.article}`}>
          <h3 className={`${styles.article_title}`}>{post.title}</h3>
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
