import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import styles from './Signup.module.css'

export default function Signup() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [displayName, setDisplayName] = useState('')
	const [thumbnail, setThumbnail] = useState(null)
	const [thumbnailError, setThumbnailError] = useState(null)

	const { error, isPending, signup } = useSignup()

	const handleSubmit = e => {
		e.preventDefault()
		signup(email, password, displayName, thumbnail)
	}

	const handleFileChange = e => {
		setThumbnail(null)
		let selected = e.target.files[0]
		console.log(selected)

		if (!selected) {
			setThumbnailError('Please select an image')
			return
		}
		if (!selected.type.includes('image')) {
			setThumbnailError('Selected file must be an image')
			return
		}
		if (selected.size > 300000) {
			setThumbnailError('Image size must be less than 300kb')
			return
		}

		setThumbnailError(null)
		setThumbnail(selected)
		console.log('thumbnail updated')
	}

	return (
		<form onSubmit={handleSubmit} className={styles['auth-form']}>
			<h2>Sign up</h2>
			<label>
				<span>email</span>
				<input
					type='email'
					required
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>
			</label>
			<label>
				<span>password:</span>
				<input
					type='password'
					required
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
			</label>
			<label>
				<span>display name:</span>
				<input
					type='text'
					required
					onChange={e => setDisplayName(e.target.value)}
					value={displayName}
				/>
			</label>
			<label>
				<span>profile thumbnail</span>
				<input type='file' required onChange={handleFileChange} />
				{thumbnailError && <div className='error'>{thumbnailError}</div>}
			</label>
			{!isPending && <button className='btn'>Signup</button>}
			{isPending && (
				<button disabled className='btn'>
					Loading
				</button>
			)}
			{error && <div className='error'>{error}</div>}
		</form>
	)
}
