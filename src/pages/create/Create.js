import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'

import styles from './Create.module.css'
import { useCollection } from '../../hooks/useCollection'
import { timestamp } from '../../firebase/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'

const categories = [
	{ value: 'development', label: 'Development' },
	{ value: 'design', label: 'Design' },
	{ value: 'sales', label: 'Sales' },
	{ value: 'marketing', label: 'Marketing' },
]

export default function Create() {
	const { documents } = useCollection('users')
	const { addDocument, response } = useFirestore('projects')
	const { user } = useAuthContext()
	const navigate = useNavigate()

	const [name, setName] = useState('')
	const [details, setDetails] = useState('')
	const [dueDate, setDueDate] = useState('')
	const [category, setCategory] = useState('')
	const [users, setUsers] = useState([])
	const [assignedUsers, setAssignedUsers] = useState([])
	const [formError, setFormError] = useState(null)

	useEffect(() => {
		if (documents) {
			const options = documents.map(user => {
				return { value: user, label: user.displayName }
			})
			setUsers(options)
		}
	}, [documents])

	const handleSubmit = async e => {
		e.preventDefault()
		setFormError(null)

		if (!category) {
			setFormError('Please select a project category')
			return
		}
		if (assignedUsers.length < 1) {
			setFormError('Please assign the project to at least 1 user')
			return
		}

		const createdBy = {
			displayName: user.displayName,
			photoURL: user.photoURL,
			id: user.uid,
		}

		const assignedUsersList = assignedUsers.map(user => {
			return {
				displayName: user.value.displayName,
				photoURL: user.value.photoURL,
				id: user.value.id,
			}
		})
		const project = {
			name,
			details,
			category: category.value,
			dueDate: timestamp.fromDate(new Date(dueDate)),
			comment: [],
			createdBy,
			assignedUsersList,
		}

		await addDocument(project)

		if (!response.error) {
			navigate('/')
		}
	}

	return (
		<div className={styles['create-form']}>
			<h2 className='page-title'>Create a new project</h2>
			<form onSubmit={handleSubmit}>
				<label>
					<span>Project name:</span>
					<input
						type='text'
						required
						onChange={e => setName(e.target.value)}
						value={name}
					/>
				</label>
				<label>
					<span>Project details:</span>
					<textarea
						type='text'
						required
						onChange={e => setDetails(e.target.value)}
						value={details}></textarea>
				</label>
				<label>
					<span>Project due date:</span>
					<input
						type='date'
						required
						onChange={e => setDueDate(e.target.value)}
						value={dueDate}
					/>
				</label>
				<label>
					<span>Project category:</span>
					<Select
						options={categories}
						onChange={option => setCategory(option)}
					/>
				</label>
				<label>
					<span>Assigned to:</span>
					<Select
						options={users}
						onChange={option => setAssignedUsers(option)}
						isMulti
					/>
				</label>
				<button className='btn'>Add Project</button>
				{formError && <p className='error'>{formError}</p>}
			</form>
		</div>
	)
}
