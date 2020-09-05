import React from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { noteDeleted } from '../slices/notesSlice';

export const Note = () => {
  const { noteId } = useParams();
  const notes = useSelector((state) => state.notes);
  const note = notes.find((note) => note.id === noteId);
  const dispatch = useDispatch();
  const history = useHistory();

  if (!note) {
    return (
      <article>
        <h2>Post not found!</h2>
      </article>
    );
  }

  const handleDelete = () => {
    dispatch(noteDeleted({ id: noteId }));
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
