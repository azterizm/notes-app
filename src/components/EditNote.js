import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { noteUpdated } from '../slices/notesSlice';

export const EditNote = () => {
  const { noteId } = useParams();
  const note = useSelector((state) => state.notes.find((note) => note.id === noteId));
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleEdit = () => {
    dispatch(noteUpdated({ id: noteId, title, content }));
    history.push(`/notes/${noteId}`);
  };

  return (
    <div className="editNote">
      <h2>Edit Note</h2>

      <label htmlFor="title">Title: </label>
      <input
        type="text"
        name="title"
        id="titleInput"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <label htmlFor="content">Content: </label>
      <br />
      <textarea
        type="text"
        name="content"
        id="contentInput"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        cols="30"
        rows="10"
      />

      <br />

      <input
        type="button"
        value="Save Note"
        name="save"
        id="saveButton"
        onClick={handleEdit}
      />
    </div>
  );
};
