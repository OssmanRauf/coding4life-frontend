import { useState, useRef } from "react"
import dynamic from "next/dynamic"

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false })

const TextEditor = ({ content, setContent }) => {
  const editor = useRef(null)
  const config = {
    readonly: false,
    placeholder: "Start your blog article...",
    buttons: [
      "source",
      "|",
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "video",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      // "copyformat",
      "|",
      "symbol",
      "fullsize",
      // "print",
      // "about",
    ],
  }

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      tabIndex={1} // tabIndex of textarea
      onBlur={(newContent) => {
        setContent(newContent)
      }}
      // preferred to use only this option to update the content for performance reasons
      // onChange={(newContent) => {
      // 	// setContent(newContent)
      // }}
    />
  )
}

export default TextEditor
