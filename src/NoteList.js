import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from './UserContext';

export default class NoteList extends React.Component {

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
        return(
            <section className="mainNotes">
                {this.context.notes.map(note =>
                    <div className="note" key={note.id}>
                        <Link to={`note/${note.id}`}>
                        {note.name}
                        </Link>
                        <div className="modified">
                            {this.formatDate(note.modified)}
                        </div>
                        <button type="submit" onClick={() => this.context.handleDeleteNote(note.id)}>Delete</button>
                    </div>
                )}
            </section>
        )
    }
}