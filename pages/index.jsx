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
            content="web-development, programming, coding, coding4life, software, blog, developer, for, life"
          />
          <meta
            name="description"
            content="A blog for developers, coders, progrmmers that provides you with variety of articles on programming topics. Use it to write and read quality articles on programming. A blog where you find everything abou coding, programming, software engineering, software development and much more. Quality. Articles. About. Coding."
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
