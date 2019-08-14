import React from 'react';
import UserContext from './UserContext'

import './addNote.css'

export default class AddNote extends React.Component {

    static contextType = UserContext

    render() {
        return(
            <section>
                <form className="addnote" onSubmit={this.context.handleAddNote}>
                    <legend>Create a New Note</legend>
                    <label htmlFor="notename">
                        New Name Name:
                        <input 
                            id="notename"
                            type="text"
                            required
                            value={this.context.newNoteName}
                            onChange={e => this.context.setNewNoteName(e.target.value)}
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