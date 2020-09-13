import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchNotes } from './../slices/manageNotes';
import { useSelector } from 'react-redux';

export const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const reduxNotes = useSelector((state) => state.notes.entities);
  const checkDeletion = useSelector((state) => state.notes.noteDeleted);

  useEffect(() => {
    (async () => {
      setNotes(await fetchNotes());
    })();
  }, [checkDeletion]);

  const renderedNotes = notes.map((note) => {
    return (
      <h5 key={note.id}>
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h5>
    );
  });

  const reduxRenderedNotes = reduxNotes.map((note) => {
    return (
      <h5 key={note.id}>
        <Link to={`/notes/${note.id}`}>{note.title}</Link>
      </h5>
    );
  });

  return (
    <div className="notesList">
      {reduxRenderedNotes}
      {renderedNotes}
      <Link id="addButton" to="/">
        +
      </Link>
    </div>
  );
};
