import Head from "next/head"
import { info } from "../../../utils/tokens"
import ListArticles from "../../../components/ListArticles"
import GoogleAds from "../../../components/GoogleAds"
export default function CategoryHome({ posts, pages, category }) {
  return (
    <div className="main-container">
      <Head>
        <meta
          name="keywords"
          content={`web-development, programming, ${category}`}
        />
        <title>{`${category}`}</title>
      </Head>
      <ListArticles
        articles={posts}
        numPages={pages.num_pages}
        currentPage={1}
        showPaginations={false}
      />
      <GoogleAds currentPath={"articlesByCategory"} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const { category } = context.query
  // Call an external API endpoint to get posts.
  const res = await fetch(
    `${info.baseUrl}/posts/?category=${category}&offset=0`
  )
  const posts_response = await res.json()
  const posts = posts_response.posts
  const pages = {
    num_results: posts_response.num_results,
    num_pages: posts_response.num_pages,
  }

  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
      pages,
      category,
    },
  }
}
