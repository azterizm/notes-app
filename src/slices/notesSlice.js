import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';
import { addNote, deleteNoteById, updateNoteById } from './manageNotes';

const notesAdapater = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = notesAdapater.getInitialState({
  entities: [],
  noteDeleted: false,
});

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    noteAdded: {
      reducer: (state, action) => {
        addNote(action.payload);
        state.entities.push(action.payload);
      },
      prepare: (title, content) => {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
          },
        };
      },
    },
    noteUpdated: (state, action) => {
      const { id, title, content } = action.payload;
      updateNoteById(id, title, content);
      state.noteDeleted = !state.noteDeleted;
    },
    noteDeleted: (state, action) => {
      deleteNoteById(action.payload);
      state.noteDeleted = !state.noteDeleted;
    },
  },
});

export const { noteAdded, noteUpdated, noteDeleted } = notesSlice.actions;

export default notesSlice.reducer;
