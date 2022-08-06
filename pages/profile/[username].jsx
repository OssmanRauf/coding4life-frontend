import Head from "next/head"
import { info } from "../../utils/tokens"
import NotFound from "../../components/NotFound"
import UserProfile from "../../components/UserProfile"
import GoogleAds from "../../components/GoogleAds"
export default function myprofile({ posts, user }) {
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
      </Head>

      <UserProfile user={user} posts={posts} />
      <GoogleAds currentPath={"userProfile"} />
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
