import Head from "next/head"
import { info } from "../../utils/tokens"
import NotFound from "../../components/NotFound"
import UserProfile from "../../components/UserProfile"
export default function Userprofile({ posts, user }) {
  if (!posts) {
    return <NotFound />
  }

  return (
    <>
      <Head>
        <title>{`${user.username}`}</title>
        <meta
          name="keywords"
          content={`web-development, programming, ${user.username}`}
        />
        <meta name="description" content={`${user.description}`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content={user.username} />
      </Head>

      <UserProfile user={user} posts={posts} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { username } = context.query

  // Call an external API endpoint to get posts.
  const settings = {
    headers: {
      accept: "application/json",
    },
  }
  const resUser = await fetch(`${info.baseUrl}/users/${username}`, settings)
  const resPost = await fetch(
    `${info.baseUrl}/posts/user/${username}`,
    settings
  )
  var user
  var posts
  if (resPost.status === 200) {
    posts = await resPost.json()
    user = await resUser.json()
  } else {
    posts = false
    user = false
  }

  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      user,
    },
  }
}
