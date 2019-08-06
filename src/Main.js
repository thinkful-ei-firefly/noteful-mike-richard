import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store'
import './Main.css';

export default class App extends Component {
    render() {
      return (
          <div className="notesHome">
              <section className="mainFolder">
                    {store.folders.map(folder =>
                    <div className="folder" key={folder.id}>
                        <Link to={`/folder/${folder.id}`}>
                        {folder.name}
                        </Link>
                    </div>
                    )}
              </section>
              <section className="mainNotes">
                  {store.notes.map(note =>
                    <div className="note" key={note.id}>
                        <Link to={`note/${note.id}`}>
                        {note.name}
                        </Link>
                        <div className="modified">
                            {note.modified}
                        </div>
                        
                    </div>
                    )}
              </section>
            
          </div>
      )
    }
}