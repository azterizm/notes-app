import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { noteAdded } from '../slices/notesSlice';
import { createRef } from 'react';

const titleRef = createRef();

export const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(noteAdded(title, content));
    setTitle('');
    setContent('');
    titleRef.current.focus();
  };

  const handleReturn = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    }
  };

  return (
    <div className="addNote">
      <h2>Add A Note</h2>

      <label htmlFor="title">Title: </label>
      <input
        type="text"
        name="title"
        id="titleInput"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        ref={titleRef}
        onKeyDown={handleReturn}
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
        onKeyDown={handleReturn}
        cols="30"
        rows="10"
        style={{ marginTop: '10px' }}
      />

      <br />

      <input
        type="button"
        value="Save Note"
        name="save"
        id="saveButton"
        onClick={handleSave}
      />
    </div>
  );
};
