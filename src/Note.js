import React, { Component } from 'react';
import store from './store';
//import { Route, Link, Switch } from 'react-router-dom';


export default class App extends Component {
    render() {
        console.log(this.props.match.params)
        const currentNote = store.notes.find(note => note.id === this.props.match.params.noteId);
        console.log(currentNote);
      return (
          <div>
              <h1>{currentNote.name}</h1>
              <p>{currentNote.modified}</p>
              <p>{currentNote.content}</p>
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