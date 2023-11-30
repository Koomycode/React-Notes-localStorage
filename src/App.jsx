import { useState, useEffect } from "react"
import Sidebar from "./comp/Sidebar"
import Editor from "./comp/Editor"
import "./App.css"

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || []
  )

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  )

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes])

  function createRandomId() {
    const first = Math.floor(Math.random() * 100)
    const second = Math.floor(Math.random() * 100)
    const third = Math.floor(Math.random() * 100)

    const randomId = `${first}${second}${third}`
    return +randomId
  }

  function createNewNote() {
    const newNote = {
      id: createRandomId(),
      title: `New Note`,
      body: "",
    }

    setNotes((prev) => [newNote, ...prev])
    setCurrentNoteId(newNote.id)
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId
      }) || notes[0]
    )
  }

  function updateNoteBody(text) {
    setNotes((prev) => {
      const newArray = []
      prev.forEach((note) => {
        note.id === currentNoteId
          ? newArray.unshift({ ...note, body: text })
          : newArray.push(note)
      })

      return newArray
    })
  }

  function updateNoteTitle(text) {
    setNotes((prev) => {
      const newArray = []
      prev.forEach((note) => {
        note.id === currentNoteId
          ? newArray.unshift({ ...note, title: text })
          : newArray.push(note)
      })

      return newArray
    })
  }

  function deleteNote(event, noteId) {
    event.stopPropagation()

    setNotes((prev) => {
      const updatedNotes = prev.filter((note) => note.id !== noteId)
      const newCurrentNoteId =
        currentNoteId === noteId
          ? updatedNotes[0]
            ? updatedNotes[0].id
            : ""
          : currentNoteId

      setCurrentNoteId(newCurrentNoteId)
      return updatedNotes
    })
  }

  return (
    <>
      {notes.length > 0 ? (
        <div className="app flex">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            createNewNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor
            currentNote={findCurrentNote()}
            updateNoteBody={updateNoteBody}
            updateNoteTitle={updateNoteTitle}
          />
        </div>
      ) : (
        <div className="app flex empty">
          <h1 className="empty-title">You have no notes</h1>
          <button className="empty-btn" onClick={createNewNote}>
            Create New Note
          </button>
        </div>
      )}
    </>
  )
}

export default App