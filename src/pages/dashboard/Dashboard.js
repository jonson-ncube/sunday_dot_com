import { useState } from 'react'
import './Dashboard.css'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import ProjectFilter from './ProjectFilter'

export default function Dashboard() {
	const { documents, error } = useCollection('projects')
	const [currentFilter, setCurrentFilter] = useState('all')
	const { user } = useAuthContext()

	const projects = documents?.filter(document => {
		switch (currentFilter) {
			case 'all':
				return true
			case 'mine':
				let assignedToMe = false
				document.assignedUsersList.forEach(u => {
					if (user.uid === u.id) {
						assignedToMe = true
					}
				})
				return assignedToMe
			case 'development':
			case 'design':
			case 'marketing':
			case 'sales':
				return document.category === currentFilter
			default:
				return true
		}
	})

	return (
		<div>
			<h2 className='page-title'>Dashboard</h2>
			<ProjectFilter
				setCurrentFilter={setCurrentFilter}
				currentFilter={currentFilter}
			/>
			{error && <p className='error'>{error}</p>}
			{projects && <ProjectList projects={projects} />}
		</div>
	)
}
