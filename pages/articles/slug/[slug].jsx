import { useRouter } from "next/router"
import Head from "next/head"
import { info } from "../../././../utils/tokens"
import NotFound from "../../../components/NotFound"
import ReadPost from "../../../components/ReadPost"
import GoogleAds from "../../../components/GoogleAds"

export default function Slug({ post, comments }) {
  if (!post) {
    return <NotFound />
  }
  const router = useRouter()
  const { slug } = router.query
  return (
    <>
      <Head>
        <title>{`${slug}`}</title>
        <meta
          name="keywords"
          content={`web-development, programming, ${post.category}`}
        />
        <meta name="description" content={`${post.description}`} />
      </Head>
      <ReadPost post={post} comments={comments} />
      <GoogleAds currentPath={"readArticle"} />
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
  }
  const resComments = await fetch(`${info.baseUrl}/comments/${slug}`)

  const comments = await resComments.json()
  return {
    props: {
      post,
      comments,
    },
  }
}
