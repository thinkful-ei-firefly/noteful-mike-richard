import React from 'react';
import UserContext from '../UserContext'

import '../styles/addNote.css'

export default class AddNote extends React.Component {

    static contextType = UserContext

    render() {
        return(
            <section>
                <form className="addnote" onSubmit={this.context.handleAddNote}>
                    <legend>Create a New Note</legend>
                    <label htmlFor="notetitle">
                        Name:
                        <input
                            id="notetitle"
                            type="text"
                            required
                            value={this.context.newNoteTitle}
                            onChange={e => this.context.setNewNoteTitle(e.target.value)}
                        />
                    </label>
                    <label htmlFor="notecontent">
                        Note:
                        <textarea
                            id="notecontent"
                            type="text"
                            required
                            value={this.context.newNoteContent}
                            onChange={e => this.context.setNewNoteContent(e.target.value)}
                        />
                    </label>
                    <button type="submit">Add Note</button>
                </form>
            </section>
        )
    }
}