import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const NotesList = () => {
  const notes = useSelector((state) => state.notes);
  const renderedNotes = notes.map((note) => {
    return (
      <h5 key={note.id}>
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h5>
    );
  });

  return <div className="notesList">{renderedNotes}</div>;
};
