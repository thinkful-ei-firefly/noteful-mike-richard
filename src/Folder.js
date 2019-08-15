import React from 'react';
import { Link } from 'react-router-dom';
import FolderList from './FolderList';
import UserContext from './UserContext';

import './Main.css';


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
        return date.toDateString()
    }

    render() {
        const folderId = this.props.match.params.folderId;
        const allFolderIds = this.context.folders.map(folder => folder.id);
        if (!allFolderIds.includes(folderId)) {
            return ( <div className="notfound">Error: Folder not found.</div>)
        } else {
            const matchingNotes = this.context.notes.filter(note => note.folderId === folderId);
            this.context.setNewNoteFolderId(folderId)
            return (
                <div className="notesHome">
                    <FolderList />
                    <section className="mainNotes">
                        {matchingNotes.map(note =>
                            <div className="note" key={note.id}>
                                <Link to={`/note/${note.id}`}>
                                {note.name}
                                </Link>
                                <div className="modified">
                                    {this.formatDate(note.modified)}
                                </div>
                                <button onClick={() => this.context.handleDeleteNote(note.id)}>Delete</button>
                            </div>
                        )}
                        <div>
                            <Link to={`/addnote`}>Add A Note</Link>
                        </div>
                    </section>
                </div>
            );
        }
    }
}