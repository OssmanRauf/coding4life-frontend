import ListArticles from "./ListArticles"
import Link from "next/link"
import { info } from "../utils/tokens"
import styles from "../styles/userProfile.module.css"
const UserProfile = ({ user, posts }) => {
  return (
    <>
      <div className={`${styles.user_profile}`}>
        <div className={`${styles.user_info}`}>
          <div className={styles.image_username}>
            <button className="image-profile">
              <img
                className="image-profile"
                height="1rem"
                alt=""
                srcSet={`${info.baseUrl}/users/profile_pic/${user.username}`}
              />
            </button>
            <Link href={`/profile/${user.username}`}>
              <a className={styles.image_username_a}>
                <h4 className={styles.image_username_img}>{user.username}</h4>
              </a>
            </Link>
          </div>
          <div className={styles.profile_bio}>
            {user.description ? (
              <>
                <h5>Bio</h5>
                <p>{user.description}</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.articles_profile_page}>
        {posts.length > 0 ? (
          <ListArticles
            articles={posts}
            numPages={1}
            currentPage={1}
            showPaginations={false}
            user={user}
            title={`${user.username} 's articles:`}
          />
        ) : (
          <h3
            style={{
              margin: "auto",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {user.username} does not have any articles
          </h3>
        )}
      </div>
    </>
  )
}

export default UserProfile
