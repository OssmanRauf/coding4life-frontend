import { useEffect, useState } from "react"
import TextEditor from "./TextEditor"
import styles from "../styles/articleform.module.css"

const ArticleForm = ({ existingContent, handleSubmit }) => {
  const [content, setContent] = useState("")
  const [title, settitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")

  useEffect(() => {
    if (existingContent) {
      settitle(existingContent.title)
      setCategory(existingContent.category)
      setDescription(existingContent.description)
      setContent(existingContent.content)
    }
  }, [])

  return (
    <div className={`${styles.article_crud}`}>
      <input
        type="text"
        className={styles.create_input}
        placeholder="Choose a awesome article title"
        onChange={(e) => {
          settitle(e.target.value)
        }}
        value={title}
      />
      <input
        type="text"
        className={`${styles.create_input} ${styles.category_input}`}
        placeholder="Category (a programming language for exemple)"
        onChange={(e) => {
          setCategory(e.target.value)
        }}
        value={category}
      />
      <textarea
        type="text"
        className={`${styles.create_input} ${styles.description_input}`}
        placeholder="Type a description of your post so that people can see what you post is about"
        onChange={(e) => {
          setDescription(e.target.value)
        }}
        value={description}
      />
      <TextEditor content={content} setContent={setContent} />
      <div className={styles.buttons_container}>
        <button
          className="btn button btn-secondary"
          onClick={() => {
            handleSubmit({
              title: title,
              category: category,
              description: description,
              content: content,
              publish: false,
            })
          }}
        >
          Save draft
        </button>

        <button
          className="btn button btn-success"
          onClick={() => {
            handleSubmit({
              title: title,
              category: category,
              description: description,
              content: content,
              publish: true,
            })
          }}
        >
          Publish
        </button>
      </div>
    </div>
  )
}

export default ArticleForm
