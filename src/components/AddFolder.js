import React from 'react';
import UserContext from '../UserContext';

import '../styles/addFolder.css'

export default class AddFolder extends React.Component {

    static contextType=UserContext;

    state = {
        folderTitle: '',
        titleError: ''
    }

    handleSubmit = e => {
        e.preventDefault();
        const isValid = this.validate();
        if(isValid) {
            //create New Folder
            console.log(this.state);
            this.context.handleAddFolder(this.state.folderTitle)   
        }
    };

    setfolderTitle = (folderTitle) => {
        this.setState({
            folderTitle
        })
    };

    validate = () => {

        let titleError = '';
        
        if(this.state.folderTitle.length < 4) {
            titleError = 'The new folder title must be 5 to 20 characters long.';
        }
        else if(this.state.folderTitle.length > 20) {
            titleError = 'The new folder title must be 5 to 20 characters long.';
        }

        if(titleError) {
            this.setState({titleError});
            return false;
        }

        return true;
    };

    render() {
        return (
            <section>
                <form className="addfolder" onSubmit={this.handleSubmit}>
                    <legend>Create a New Folder</legend>
                    <label htmlFor="addfolder">
                        Title:
                        <input 
                            id="addfolder"
                            type="text"
                            required
                            value={this.state.folderTitle}
                            onChange={e => this.setfolderTitle(e.target.value)}
                        />
                    </label>
                    <div className="error">{ this.state.titleError }</div>
                    <button type="submit">Add Folder</button>
                </form>
            </section>
        )
    }
}