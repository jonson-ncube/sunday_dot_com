import './Project.css'
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import ProjectSummary from './ProjectSummary'
import ProjectComments from './ProjectComments'

export default function Project() {
	const { id } = useParams()
	const { error, document } = useDocument('projects', id)

	if (error) {
		return <p className='error'>{error}</p>
	}

	if (!document) {
		return <div className='loading'>Loading...</div>
	}
	return (
		<div className='project-details'>
			<ProjectSummary project={document} />
			<ProjectComments project={document} />
		</div>
	)
}
