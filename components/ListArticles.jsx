import React, { useState } from "react"
import SingleArticleCard from "./SingleArticleCard"
import Pagination from "./Pagination"
import styles from "../styles/listArticles.module.css"
const ListArticles = ({
  articles,
  isAdmin,
  numPages,
  currentPage,
  showPaginations,
  user,
  title,
}) => {
  const [showAlert, setShowAlert] = useState(false)

  if (isAdmin) {
    return (
      <div className={`${styles.list_article}`}>
        <div className={`${styles.recent_article}`}>
          {showAlert ? (
            <div className="alert alert-danger fixed-top m-4">
              Deleted successfully
            </div>
          ) : null}
          {articles.map((article) => {
            return (
              <SingleArticleCard
                isAdmin={isAdmin}
                key={article.id}
                object={article}
                setShowAlert={setShowAlert}
              />
            )
          })}
        </div>
      </div>
    )
  }

  console.log(articles)
  return (
    <div className={`${styles.list_article}`}>
      {!title ? (
        <h2 className={`${styles.recent_article_title}`}>Recent posts:</h2>
      ) : (
        <h3 className={`${styles.recent_article_title}`}>{title}</h3>
      )}
      <div className={`${styles.recent_article}`}>
        {articles.length > 0 ? (
          articles[0].Post ? (
            articles.map((ob) => {
              return (
                <SingleArticleCard
                  isAdmin={isAdmin}
                  key={ob.Post.id}
                  object={ob}
                  title={title}
                />
              )
            })
          ) : (
            articles.map((post) => {
              return (
                <SingleArticleCard
                  isAdmin={isAdmin}
                  key={post.id}
                  object={{ Post: post, User: user }}
                />
              )
            })
          )
        ) : (
          <h4>Sorry articles not available</h4>
        )}
      </div>
      {showPaginations ? (
        articles.length != 0 ? (
          <Pagination numPages={numPages} currentPage={currentPage} />
        ) : null
      ) : null}
    </div>
  )
}
export default ListArticles
