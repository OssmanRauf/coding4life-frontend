import Link from "next/link"

import React from "react"

export const Page = ({ page, currentPage }) => {
  return (
    <li
      key={page}
      className={
        page === parseInt(currentPage) ? "page-item active" : "page-item"
      }
    >
      <Link href={`/${page}`}>
        <a className="page-link">{page}</a>
      </Link>
    </li>
  )
}

const Pagination = ({ numPages, currentPage }) => {
  const array = [...Array(numPages).keys()]
  return (
    <>
      <nav aria-label="..." className="mb-0 pb-0 pagination-style">
        <ul className="pagination pagination-list">
          {array.map((k) => {
            return <Page key={k} page={k + 1} currentPage={currentPage} />
          })}
        </ul>
      </nav>
    </>
  )
}

export default Pagination
