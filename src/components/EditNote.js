import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { noteUpdated } from '../slices/notesSlice';
import { fetchNoteById } from '../slices/manageNotes';

export const EditNote = () => {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [getNoteId, setNoteId] = useState([]);
  const note = getNoteId[0] ? getNoteId[0] : '';
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      // setNoteId(await fetchNoteById(noteId));
      const data = await fetchNoteById(noteId);
      setNoteId(data);
      setTitle(data[0].title);
      setContent(data[0].content);
    })();
  }, [noteId]);

  const handleEdit = () => {
    dispatch(noteUpdated({ id: noteId, title, content }));
    history.push('/notes');
  };

  if (!note) {
    return (
      <div className="editNote">
        <h2>Loading..</h2>
      </div>
    );
  }

  return (
    <div className="editNote">
      <h2>Edit Note</h2>

      <label htmlFor="title">Title: </label>
      <input
        name="title"
        id="titleInput"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <label htmlFor="content">Content: </label>
      <br />
      <textarea
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
