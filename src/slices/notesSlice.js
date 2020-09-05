import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
  {
    id: '1',
    title: 'Get things done',
    content: 'Gotta go to the grocery store',
  },
];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    noteAdded: {
      reducer: (state, action) => {
        state.push(action.payload);
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
      const note = state.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }
    },
    noteDeleted: (state, action) => {
      const { id } = action.payload;
      const index = state.map((note) => note.id).indexOf(id);
      state.splice(index, 1);
    },
  },
});

export const { noteAdded, noteUpdated, noteDeleted } = notesSlice.actions;

export default notesSlice.reducer;
