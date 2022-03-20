import React, { useNavigate } from 'react-router-dom'
import Avatar from '../../components/Avatar'
import { useFirestore } from '../../hooks/useFirestore'
import { useAuthContext } from '../../hooks/useAuthContext'

export default function ProjectSummary({ project }) {
	const navigate = useNavigate()
	const { user } = useAuthContext()
	const { deleteDocument } = useFirestore('projects')

	const handleDelete = e => {
		e.preventDefault()
		deleteDocument(project.id)
		navigate('/')
	}

	return (
		<div>
			<div className='project-summary'>
				<h2 className='page-title'>{project.name}</h2>
				<p>By {project.createdBy.displayName}</p>
				<p className='due-date'>
					Project due by {project.dueDate.toDate().toDateString()}
				</p>
				<div className='details'>{project.details}</div>
				<h4>Project assigned to:</h4>
				<div className='assigned-users'>
					{project.assignedUsersList.map(user => (
						<div key={user.id}>
							<Avatar src={user.photoURL} />
						</div>
					))}
				</div>
			</div>
			{user.uid === project.createdBy.id && (
				<button onClick={handleDelete} className='btn'>
					Mark as complete
				</button>
			)}
		</div>
	)
}
