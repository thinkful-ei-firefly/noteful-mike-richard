
import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Main from './components/Main';
import Folder from './components/Folder';
import Note from './components/Note';
import AddFolder from './components/AddFolder';
import AddNote from './components/AddNote';
import NotFoundPage from './components/NotFoundPage';
import UserContext from './UserContext';
import history from './history';

import './styles/App.css';

require('dotenv').config()

const API_KEY = process.env.REACT_APP_API_KEY;

const DB_URL = 'https://stark-harbor-95475.herokuapp.com';

class App extends React.Component {

	static contextType = UserContext;

    state = {
		folders: [],
		notes: [],
		// newFolderTitle: '',
		newNoteFolderId: '',
		// newNoteTitle: '',
		// newNoteContent: '',
		loading: true
	}
	
	getState = () => {
		fetch(`${DB_URL}/api/folders`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${API_KEY}`
			}
		})
			.then(res => res.json())
			.then(resJson => {
				this.setState({
					folders: resJson,
					newFolderTitle: ''
				})
			})
		fetch(`${DB_URL}/api/notes`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${API_KEY}`
			}
		})
			.then(res => res.json())
			.then(resJson => {
				this.setState({
					notes: resJson,
					newNoteTitle: '',
					newNoteContent: '',
					loading: false,
				})
			})
	}

	componentDidMount() {
		this.getState();
	}
	
	// setNewFolderTitle = (title) => {
	// 	this.setState({
	// 		newFolderTitle: title,
	// 	})
	// }

	// setNewNoteTitle = (title) => {
	// 	this.setState({
	// 		newNoteTitle: title,
	// 	})
	// }

	// setNewNoteContent = (text) => {
	// 	this.setState({
	// 		newNoteContent: text,
	// 	})
	// }

	noteFolderId = '';

	setNewNoteFolderId = (id) => {
		this.noteFolderId = id; //this is a number, tried changeing to string using .toString() without success
	}

	handleAddFolder = (folderTitle) => {

		fetch(`${DB_URL}/api/folders`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${API_KEY}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				title: folderTitle	
			})
		})
		.then(() => this.getState())
		.then(() => history.push('/'))
	}

	handleAddNote = (newNoteTitle, newNoteContent) => {
		fetch(`${DB_URL}/api/notes`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${API_KEY}`,
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				title: newNoteTitle,
				folderid: this.noteFolderId,
				content: newNoteContent
			})
		})
		.then(() => this.getState())
		.then(() => history.push(`/folder/${this.noteFolderId}`))
	}

	handleDeleteNote = (noteId) => {
		fetch(`${DB_URL}/api/notes/${noteId}`, {
			method: 'Delete',
			headers: {
				'Authorization': `Bearer ${API_KEY}`,
				'content-type': 'application/json'
			},
		})
		.then(() => {
			this.setState ({
				notes: this.state.notes.filter(note => note.id !== noteId)
			})
		})
	}

	

	render() {
		const { loading } = this.state
		if (loading) {
			return ( <div>loading . . .</div>)
		} else {
			return (
			<div>
				<header>
				<Link to='/'><h1>Noteful</h1></Link>
				</header>
				<main>
				<UserContext.Provider
					value= {{
						folders: this.state.folders,
						notes: this.state.notes,
						handleDeleteNote: this.handleDeleteNote,
						handleAddFolder: this.handleAddFolder,
						// newFolderTitle: this.state.newFolderTitle,
						// setNewFolderTitle: this.setNewFolderTitle,
						handleAddNote: this.handleAddNote,
						// newNoteTitle: this.state.newNoteTitle,
						// setNewNoteTitle: this.setNewNoteTitle,
						// newNoteContent: this.state.NewNoteContent,
						// setNewNoteContent: this.setNewNoteContent,
						setNewNoteFolderId: this.setNewNoteFolderId,
					}}>
					<Switch>
						<Route
							exact
							path='/'
							component={Main}
						/>
						<Route
							path='/folder/:folderId'
							component={Folder}
						/>
						<Route
							path='/note/:noteId'
							component={Note}
						/>
						<Route
							path='/addfolder'
							component={AddFolder}
						/>
						<Route
							path='/addnote'
							component={AddNote}
						/>
						<Route 
							component={NotFoundPage}
						/>
					</Switch>
				</UserContext.Provider>
				</main>
			</div>
			);
		}
	}
}


export default App