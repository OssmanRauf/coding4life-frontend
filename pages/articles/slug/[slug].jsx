import { useRouter } from "next/router"
import Head from "next/head"
import { info } from "../../././../utils/tokens"
import NotFound from "../../../components/NotFound"
import ReadPost from "../../../components/ReadPost"

export default function Slug({ post, comments, user }) {
  const router = useRouter()
  if (!post) {
    return <NotFound />
  }
  const { slug } = router.query
  return (
    <>
      <Head>
        <title>{`${post.title}`}</title>
        <meta
          name="keywords"
          content={`web-development, programming, ${post.category}`}
        />
        <meta name="description" content={`${post.description}`} />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content={user.username} />
      </Head>
      <ReadPost post={post} comments={comments} />
    </>
  )
}

export async function getServerSideProps(context) {
  const { slug } = context.query
  const res = await fetch(`${info.baseUrl}/posts/slug/${slug}`)
  var response
  var post
  if (res.status !== 200) {
    post = false
  } else {
    response = await res.json()
    post = response.Post
    user = response.User
  }
  const resComments = await fetch(`${info.baseUrl}/comments/${slug}`)

  const comments = await resComments.json()
  return {
    props: {
      post,
      comments,
      user,
    },
  }
}
