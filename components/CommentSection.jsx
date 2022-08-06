import { useEffect, useState } from "react"
import { getAccessToken, info } from "../utils/tokens"
import SingleComment from "./SingleComment"
import styles from "../styles/commentSection.module.css"
const CommentSection = ({ comments, postId }) => {
  const [accessTokenState, setAcessTokenState] = useState("")
  const [commentsState, setCommentsState] = useState(comments)
  const [newComment, setNewComment] = useState("")
  const [showAlert, setShowAlert] = useState(false)
  const [alertMessage, setAlertMessage] = useState("")
  useEffect(() => {
    const handler = async () => {
      const accessToken = await getAccessToken()
      if (!accessToken) {
        setAcessTokenState("")
      } else {
        setAcessTokenState(accessToken)
      }
    }
    handler()
  }, [])

  const handleSubmit = async () => {
    const commentWithoutSpaces = newComment.split(" ").join("")
    if (commentWithoutSpaces.length < 1) {
      setShowAlert(true)
      setNewComment("")
      setAlertMessage("You cannot add a blank comment")
      setTimeout(() => {
        setShowAlert(false)
      }, 2500)
    } else {
      const res = await fetch(`${info.baseUrl}/comments/`, {
        method: "POST",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${accessTokenState}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newComment,
          post_id: postId,
        }),
      })
      if (res.status !== 201) {
        setShowAlert(true)
        setNewComment("")
        setAlertMessage("Something went wrong. Please try again")
        setTimeout(() => {
          setShowAlert(false)
        }, 2500)
      } else {
        const response = await res.json()
        setCommentsState((comments) => [response, ...comments])
        setNewComment("")
      }
    }
  }

  return (
    <div>
      <h5>Comments</h5>
      {accessTokenState ? (
        <div className={`${styles.comment_input}`}>
          {showAlert ? (
            <div
              style={{ textAlign: "center" }}
              className={`alert alert-danger`}
            >
              {alertMessage}
            </div>
          ) : null}
          <div className={`${styles.comment_form}`}>
            <textarea
              placeholder="Add a comment..."
              name=""
              className={`${styles.comment_textarea}`}
              onChange={(e) => {
                setNewComment(e.target.value)
              }}
              value={newComment}
            ></textarea>
            <button
              className={`${styles.add_comment_btn} btn-primary`}
              onClick={handleSubmit}
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <h5 style={{ textAlign: "center", marginTop: "20px" }}>
          You need to be loged in to comment
        </h5>
      )}
      <hr
        style={{
          color: "black",
          backgroundColor: "black",
        }}
      />
      <div>
        {commentsState.map((comment) => {
          return <SingleComment key={comment.Comment.id} comment={comment} />
        })}
      </div>
    </div>
  )
}

export default CommentSection
