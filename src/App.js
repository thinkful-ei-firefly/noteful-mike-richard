import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Main from './Main';
import Folder from './Folder';
import Note from './Note';
import AddFolder from './AddFolder';
import AddNote from './AddNote';
import NotFoundPage from './NotFoundPage';
import UserContext from './UserContext';
import history from './history';

import './App.css';

class App extends React.Component {

	static contextType = UserContext;

    state = {
		folders: [],
		newFolderName: '',
		notes: [],
		newNoteFolderId: '',
		newNoteName: '',
		newNoteContent: '',
		loading: true,
	}
	
	getState = () => {
		fetch(`http://localhost:8080/db`)
			.then(res => res.json())
			.then(resJson => {
				this.setState({
					folders: resJson.folders,
					newFolderName: '',
					notes: resJson.notes,
					newNoteName: '',
					newNoteContent: '',
					loading: false,
				})
			})
	}

	componentDidMount() {
		this.getState();
	}
	
	setNewFolderName = (name) => {
		this.setState({
			newFolderName: name,
		})
	}

	setNewNoteName = (name) => {
		this.setState({
			newNoteName: name,
		})
	}

	setNewNoteContent = (text) => {
		this.setState({
			newNoteContent: text,
		})
	}

	noteFolderId = '';

	setNewNoteFolderId = (id) => {
		this.noteFolderId = id;
	}

	getTimeStamp = () => {
		const d = new Date(),
			month = '' + (d.getMonth() + 1),
			day = '' + d.getDate(),
			year = '' + d.getFullYear(),
			hour = '' + d.getHours(),
			min = '' + d.getMinutes(),
			sec = '' + d.getSeconds(),
			msec = '' + d.getMilliseconds();
		console.log(`hours: ${hour}, min: ${min}, sec: ${sec}`)
		return [[[
			[year, month, day].join('-'), 
			[hour, min, sec].join(':')
			].join('T'), msec].join('.'), 'Z'].join('')
	}

	handleAddFolder = (e) => {
		e.preventDefault();
		fetch(`http://localhost:8080/folders`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.newFolderName	
			})
		})
		.then(() => this.getState())
		.then(() => history.push('/'))
	}

	handleAddNote = (e) => {
		e.preventDefault()
		const dateTimeStamp = this.getTimeStamp();
		fetch('http://localhost:8080/notes', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				name: this.state.newNoteName,
				modified: dateTimeStamp,
				folderId: this.noteFolderId,
				content: this.state.newNoteContent
			})
		})
		.then(() => this.getState())
		.then(() => history.push(`/folder/${this.noteFolderId}`))
	}

	handleDeleteNote = (noteId) => {
		fetch(`http://localhost:8080/notes/${noteId}`, {
			method: 'Delete',
			headers: {
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
		const {loading, ...props} = this.state
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
					newFolderName: this.state.newFolderName,
					setNewFolderName: this.setNewFolderName,
					handleAddNote: this.handleAddNote,
					newNoteName: this.state.newNoteName,
					setNewNoteName: this.setNewNoteName,
					newNoteContent: this.state.NewNoteContent,
					setNewNoteContent: this.setNewNoteContent,
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

export default App //withRouter(App)