function Sidebar(props) {
  const notesElements = props.notes.map((note) => {
    return (
      <div
        className={
          note.id === props.currentNote.id ? "note flex selected" : "note flex"
        }
        key={note.id}
        onClick={() => props.setCurrentNoteId(note.id)}>
        <h4 className="note-title">{note.title}</h4>
        <button
          className="delete-btn"
          onClick={(event) => props.deleteNote(event, note.id)}>
          -
        </button>
      </div>
    )
  })

  return (
    <div className="sidebar flex">
      <div className="sidebar-title flex">
        <h2>Notes</h2>
        <button className="add-btn" onClick={props.createNewNote}>
          Add Note
        </button>
      </div>
      {notesElements}
    </div>
  )
}

export default Sidebar
