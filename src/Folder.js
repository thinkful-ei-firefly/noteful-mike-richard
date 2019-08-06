import React, { Component } from 'react';
import store from './store.js';
import { Link } from 'react-router-dom';
import './Main.css'


export default class App extends Component {

    render() {
        const matchingNotes = store.notes.filter(note => note.folderId === this.props.match.params.folderId);
      return (
          <div className="notesHome">
              <section className="mainFolders">
                    {store.folders.map(folder =>
                    <div className="folder" key={folder.id}>
                        <Link to={`/folder/${folder.id}`}>
                        {folder.name}
                        </Link>
                    </div>
                    )}
              </section>
              <section className="mainNotes">
                    {matchingNotes.map(note =>
                    <div className="note" key={note.id}>
                        <Link to={`/note/${note.id}`}>
                        {note.name}
                        </Link>
                        <div className="modified">
                            {note.modified}
                        </div>
                    </div>
                    )}
              </section>
              {console.log(this.props.match.params.folderId)}
          </div>
      );
    }
}