import { info } from "../../utils/tokens"
import ListArticles from "../../components/ListArticles"
import NotFound from "../../components/NotFound"
import Head from "next/head"
import GoogleAds from "../../components/GoogleAds"

const search = ({ posts, slug }) => {
  if (posts.length < 1) {
    return <NotFound />
  }
  return (
    <>
      <Head>
        <title>{`${slug}`}</title>
        <meta name="keywords" content={`web-development, programming`} />
        <meta name="description" content={`${slug}`} />
      </Head>
      <div>
        <ListArticles articles={posts} showPaginations={false} />
      </div>
      <GoogleAds currentPath={"searchArticle"} />
    </>
  )
}
export default search
export async function getServerSideProps(context) {
  const { slug } = context.query
  // Call an external API endpoint to get posts.
  const res = await fetch(`${info.baseUrl}/posts/?search=${slug}&offset=0`)
  const posts_response = await res.json()
  const posts = posts_response.posts

  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      slug,
    },
  }
}
