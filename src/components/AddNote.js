import React from 'react';
import UserContext from '../UserContext'

import '../styles/addNote.css'

export default class AddNote extends React.Component {

    static contextType = UserContext

    initialState = {
        noteTitle: '',
        noteContent: '',
        titleError: '',
        contentError: ''
    }

    state = this.initialState;

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        const isValid = this.validate();

        if(isValid) {
            //create the Note
            this.context.handleAddNote(this.state.noteTitle, this.state.noteContent)
        }
    }

    setNoteTitle = noteTitle => {
        this.setState({noteTitle})
    }

    setNoteContent = noteContent => {
        this.setState({noteContent})
    }

    validate = () => {

        let titleError = '';
        let contentError = '';
        //validate title 5-19 characters
        if(this.state.noteTitle.length < 4) {
            titleError = 'The new note title must be 5 to 20 characters long.';
        }
        else if(this.state.noteTitle.length > 21) {
            titleError = 'The new note title must be 5 to 20 characters long.';
        }
        //validate content is 5-40 characters
        if(this.state.noteContent.length < 4) {
            contentError = 'The new note contents must be 5 to 50 characters long.';
        }
        else if(this.state.noteContent.length > 51) {
            contentError = 'The new note contents must be 5 to 50 characters long.';
        }
        //if there is an error set state with error and return false to isValid
        if(titleError || contentError) {
            this.setState({ 
                titleError,
                contentError
            });
            return false;
        } 
        //if no errors return true to isValid
        else {
            return true;
        }
    }

    render() {
        return(
            <section>
                <form className="addnote" onSubmit={this.handleSubmit}>
                    <legend>Create a New Note</legend>
                    <label htmlFor="notetitle">
                        Title:
                        <input
                            id="notetitle"
                            type="text"
                            required
                            value={this.state.noteTitle}
                            onChange={e => this.setNoteTitle(e.target.value)}
                        />
                    </label>
                    <div className="error">{this.state.titleError}</div>
                    <label htmlFor="notecontent">
                        Contents:
                        <textarea
                            id="notecontent"
                            type="text"
                            required
                            value={this.state.noteContent}
                            onChange={e => this.setNoteContent(e.target.value)}
                        />
                    </label>
                    <div className="error">{this.state.contentError}</div>
                    <button type="submit">Add Note</button>
                </form>
            </section>
        )
    }
}