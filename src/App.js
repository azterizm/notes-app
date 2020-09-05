import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Note } from './components/Note';
import { NotesList } from './components/NotesList';
import { AddNote } from './components/AddNote';
import { EditNote } from './components/EditNote';

const App = () => {
  return (
    <BrowserRouter>
      <NotesList />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <main>
              <AddNote />
            </main>
          )}
        />
        <Route exact path="/notes/:noteId" component={Note} />
        <Redirect from="/notes" to="/" />
        <Route exact path="/editnote/:noteId" component={EditNote} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
