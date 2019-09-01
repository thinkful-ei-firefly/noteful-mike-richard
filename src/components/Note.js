import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

import '../styles/Note.css';

export default class App extends React.Component {

    static contextType = UserContext;

    formatDate = (mod) => {
        const year = mod.slice(0, 4);
        const month = mod.slice(5, 7) - 1;
        const day = mod.slice(8, 10);
        const hour = mod.slice(11, 13);
        const min = mod.slice(14, 16);
        const sec = mod.slice(17, 19);
        const date = new Date(year, month, day, hour, min, sec)
        console.log((date.toDateString()));
        return date.toDateString()
    }

    render() {
        const noteId = parseInt(this.props.match.params.noteId);
        const allNoteIds = this.context.notes.map(note => note.id)
        if (!allNoteIds.includes(noteId)) {
            return ( <div className="notfound">Error: Note not found.</div>)
        } else {
            const currentNote = this.context.notes.find(note => note.id === parseInt(this.props.match.params.noteId));
            const currentFolder = this.context.folders.find(folder => folder.id === parseInt(currentNote.folderid));
            return (
                <div className="currentNote">
                    <section>
                        <Link 
                            to={`/folder/${currentFolder.id}`} 
                            className="goBack">
                        Go Back
                        </Link>
                        <div className="currentFolder">
                            {currentFolder.title}
                        </div>
                    </section>
                    <section>
                        <div className="note">
                            {currentNote.title}
                            <div className="modified">
                                {currentNote.modified.slice(0, 15)}
                            </div>
                        </div>
                        <p className="content">{currentNote.content}</p>
                    </section>
                    
                    
                </div>
            )
        }
    }
}
