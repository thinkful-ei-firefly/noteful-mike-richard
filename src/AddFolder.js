import React from 'react';
import UserContext from './UserContext';

import './addFolder.css'

export default class AddFolder extends React.Component {

    static contextType=UserContext;

    render() {
        return (
            <section>
                <form className="addfolder" onSubmit={this.context.handleAddFolder}>
                    <legend>Create a New Folder</legend>
                    <label htmlFor="addfolder">
                        New Folder Name:
                        <input 
                            id="addfolder"
                            type="text"
                            required
                            value={this.context.newFolderName}
                            onChange={e => this.context.setNewFolderName(e.target.value)}
                        />
                    </label>
                    <button type="submit">Add Folder</button>
                </form>
            </section>
        )
    }
}