import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Main from './Main';
import Folder from './Folder';
import Note from './Note';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <Link to='/'><h1>Noteful</h1></Link>
        </header>
        <main>
          <Switch>
            <Route
              exact
              path='/'
              component={Main}
            />
            <div>Folders</div>
              <Route
              path='/folder/:folderId'
              component={Folder}
            />
            <div>Notes</div>
              <Route
              path='/note/:noteId'
              component={Note}
            />
            
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
