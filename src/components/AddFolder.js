import React from 'react';
import UserContext from '../UserContext';

import '../styles/addFolder.css'

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
                            value={this.context.newFolderTitle}
                            onChange={e => this.context.setNewFolderTitle(e.target.value)}
                        />
                    </label>
                    <button type="submit">Add Folder</button>
                </form>
            </section>
        )
    }
}