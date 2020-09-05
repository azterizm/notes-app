import { createSlice, nanoid, createEntityAdapter } from '@reduxjs/toolkit';

const notesAdapater = createEntityAdapter({
  sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = notesAdapater.getInitialState({
  entities: [{ id: '1', title: 'title', content: 'content' }],
});

// const initialState = [
//   {
//     id: '1',
//     title: 'Get things done',
//     content: 'Gotta go to the grocery store',
//   },
// ];

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    noteAdded: {
      reducer: (state, action) => {
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
      const note = state.entities.find((note) => note.id === id);
      if (note) {
        note.title = title;
        note.content = content;
      }
    },
    noteDeleted: (state, action) => {
      const { id } = action.payload;
      const index = state.entities.map((note) => note.id).indexOf(id);
      state.entities.splice(index, 1);
    },
  },
});

export const { noteAdded, noteUpdated, noteDeleted } = notesSlice.actions;

export default notesSlice.reducer;
