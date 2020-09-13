import React, { useState, useEffect } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { noteDeleted } from '../slices/notesSlice';
import { fetchNoteById } from './../slices/manageNotes';

export const Note = () => {
  const { noteId } = useParams();
  const [notesIds, setNotesIds] = useState([]);
  const note = notesIds[0] ? notesIds[0] : 'Loading..';
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      setNotesIds(await fetchNoteById(noteId));
    })();
  }, [noteId]);

  if (noteId !== note.id) {
    return (
      <article>
        <h2>Loading..</h2>
      </article>
    );
  }

  const handleDelete = () => {
    dispatch(noteDeleted(noteId));
    history.push('/');
  };

  return (
    <>
      <article>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <Link to={`/editnote/${note.id}`}>Edit Note</Link>
        <br />
        <button id="deleteBtn" onClick={handleDelete}>
          Delete
        </button>
      </article>
    </>
  );
};
