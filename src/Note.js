import React, { Component } from 'react';
import './Note.css';
import store from './store';


export default class App extends Component {
    render() {
        const currentNote = store.notes.find(note => note.id === this.props.match.params.noteId);
        const currentFolder = store.folders.find(folder => folder.id === currentNote.folderId);
    return (
        <div className="currentNote">
            <section>
                <div className="goBack">Go Back</div>
                <div className="currentFolder">
                    {currentFolder.name}
                </div>
            </section>
            <section>
                <div className="note">
                    {currentNote.name}
                    <div className="modified">
                        {currentNote.modified}
                    </div>
                </div>
                <p className="content">{currentNote.content}</p>
              </section>
              
              
        </div>
    )
    }
}

/**
 * get a param that contains the note id
 * 
 * use that like we did in folders to find the
 * note
 * 
 */