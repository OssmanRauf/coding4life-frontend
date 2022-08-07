import Head from "next/head"
import NotFound from "../components/NotFound"
import { useRouter } from "next/router"
import { info } from "../utils/tokens"
import ListArticles from "../components/ListArticles"
import GoogleAds from "../components/GoogleAds"
export default function Home({ posts, pages }) {
  const router = useRouter()
  const { page } = router.query
  const pageNumber = parseInt(page)
  if (isNaN(pageNumber) || posts.length < 1) {
    return <NotFound />
  } else {
    return (
      <>
        <div className="main-container">
          <Head>
            <meta name="keywords" content={`web-development, programming`} />
            <title> Home </title>
          </Head>
          <ListArticles
            articles={posts}
            numPages={pages.num_pages}
            currentPage={page}
            showPaginations={true}
          />
        </div>
        <GoogleAds currentPath={"articlesPage"} />
      </>
    )
  }
}

export async function getServerSideProps(context) {
  const { page } = context.query
  const offset = parseInt(page) * 10 - 10
  // Call an external API endpoint to get posts.
  const res = await fetch(`${info.baseUrl}/posts/?limit=10&offset=${offset}`)
  const posts_response = await res.json()
  var posts = posts_response.posts
  var pages = {
    num_results: posts_response.num_results,
    num_pages: posts_response.num_pages,
  }
  if (posts === undefined) {
    posts = false
    pages = false
  }
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      pages,
    },
  }
}
