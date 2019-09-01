import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default class NoteList extends React.Component {

    static contextType = UserContext;

    render() {
        return(
            <section className="mainNotes">
                {this.context.notes.map(note =>
                    <div className="note" key={note.id}>
                        <Link to={`note/${note.id}`}>
                        {note.title}
                        </Link>
                        <div className="modified">
                            {note.modified.slice(0, 15)}
                        </div>
                        <button type="submit" onClick={() => this.context.handleDeleteNote(note.id)}>Delete</button>
                    </div>
                )}
            </section>
        )
    }
}