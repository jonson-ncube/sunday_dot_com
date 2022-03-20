const filterList = [
	'all',
	'mine',
	'development',
	'design',
	'marketing',
	'sales',
]

export default function ProjectFilter({ setCurrentFilter, currentFilter }) {
	const handleClick = item => {
		setCurrentFilter(item)
	}

	return (
		<div className='project-filter'>
			<nav>
				<p>Filter by : </p>
				{filterList.map(item => (
					<button
						className={currentFilter === item ? 'active' : ''}
						key={item}
						onClick={() => handleClick(item)}>
						{item}
					</button>
				))}
			</nav>
		</div>
	)
}
