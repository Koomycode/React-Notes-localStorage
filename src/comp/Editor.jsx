import { useEffect, useState } from "react"

function Editor(props) {
  const [text, setText] = useState({
    title: "",
    body: "",
  })

  const [isEdited, setIsEdited] = useState(false)

  useEffect(() => {
    setText({
      title: `${props.currentNote.title}`,
      body: `${props.currentNote.body}`,
    })
  }, [props.currentNote.id])

  useEffect(() => {
    if (isEdited) {
      props.updateNoteBody(text.body)
      props.updateNoteTitle(text.title)

      setTimeout(() => {
        setIsEdited(false)
      }, 100)
    }
  }, [text])

  function handleChange(event) {
    const { name, value } = event.target

    setText((prev) => ({
      ...prev,
      [name]: value,
    }))

    setIsEdited(true)
  }

  return (
    <div className="editor">
      <h1 className="editor-title">Editor</h1>

      <div className="editor-note flex">
        <textarea
          placeholder="Write Your Note Title"
          className="editor-note-title"
          name="title"
          onChange={handleChange}
          value={text.title}
        />

        <hr />
        <textarea
          placeholder="Write Your Note"
          className="editor-note-body"
          name="body"
          onChange={handleChange}
          value={text.body}
        />
      </div>
    </div>
  )
}

export default Editor
