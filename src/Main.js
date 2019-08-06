import React, { Component } from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import store from './store'
//import Folder from './Folder';
//import Note from './Note';

export default class App extends Component {
    render() {
      return (
          <div>
              <section className="folders">
                <h2>Folders</h2>
                    {store.folders.map(folder =>
                    <div key={folder.id}>
                        <Link to={`/folder/${folder.id}`}>
                        {folder.name}
                        </Link>
                    </div>
                    )}
              </section>
              <section className="notes">
                  <h2>Notes</h2>
                  {store.notes.map(note =>
                    <div key={note.id}>
                        <Link to={`note/${note.id}`}>
                        {note.name}
                        </Link>
                    </div>
                    )}
              </section>
            
          </div>
      )
    }
}