import React, { Component } from 'react';
import store from './store.js';
import { Route, Link, Switch } from 'react-router-dom';


export default class App extends Component {

    render() {
        const matchingNotes = store.notes.filter(note => note.folderId === this.props.match.params.folderId);
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
                    {matchingNotes.map(note =>
                    <div key={note.id}>
                        <Link to={`/note/${note.id}`}>
                        {note.name}
                        </Link>
                    </div>
                    )}
              </section>
              {console.log(this.props.match.params.folderId)}
          </div>
      );
    }
}