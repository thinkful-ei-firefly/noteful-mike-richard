import React from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../UserContext';

export default class FolderList extends React.Component {

    static contextType = UserContext;

    render(){
        return (
            <section className="mainFolder">
                {this.context.folders.map(folder =>
                    <div className="folder" key={folder.id}>
                        <Link to={`/folder/${folder.id}`}>
                        {folder.title}
                        </Link>
                    </div>
                )}
                <div className="addFolder">
                    <Link to={`/addfolder`}>Add Another Folder</Link>
                </div>
            </section>
        )
    }
}