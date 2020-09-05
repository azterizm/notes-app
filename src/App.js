import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Note } from './components/Note';
import { NotesList } from './components/NotesList';
import { AddNote } from './components/AddNote';
import { EditNote } from './components/EditNote';
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div id="sidebar">
        <NotesList />
      </div>
      <div id="content">
        <Switch>
          <Route exact path="/" render={() => <AddNote />} />
          <Route exact path="/notes/:noteId" component={Note} />
          <Redirect from="/notes" to="/" />
          <Route exact path="/editnote/:noteId" component={EditNote} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
