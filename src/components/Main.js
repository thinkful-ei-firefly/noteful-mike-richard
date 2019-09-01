import React from 'react';
import FolderList from './FolderList';
import NoteList from './NoteList';

import '../styles/Main.css';


export default class App extends React.Component {

    render() {
        return (
            <div className="notesHome">
                        <FolderList />
                        <NoteList />
            </div>
        )
    }
}