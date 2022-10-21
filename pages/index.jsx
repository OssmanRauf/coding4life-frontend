import Head from "next/head"
import { info } from "../utils/tokens"
import ListArticles from "../components/ListArticles"
export default function Home({ posts, pages }) {
  return (
    <>
      <div className="main-container">
        <Head>
          <meta
            name="keywords"
            content="web-development, programming, coding, coding4life, software"
          />
          <meta
            name="description"
            content={`Coding4life a blog where you can learn and share your knowledge with others`}
          />
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="English" />
          <title> Home </title>
        </Head>
        <ListArticles
          articles={posts}
          numPages={pages.num_pages}
          currentPage={1}
          showPaginations={true}
        />
      </div>
    </>
  )
}

export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  const res = await fetch(`${info.baseUrl}/posts/?&limit=10&offset=0`)
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
    },
  }
}
