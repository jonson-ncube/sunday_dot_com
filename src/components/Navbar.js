import styles from './Navbar.module.css'
import temple from '../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

export default function Navbar() {
	const { logout, isPending } = useLogout()
	const { user } = useAuthContext()

	return (
		<div className={styles.navbar}>
			<ul>
				<li className={styles.logo}>
					<img src={temple} alt='site logo' />
					<span>Sunday.com</span>
				</li>
				{!user && (
					<>
						<li>
							<Link to='/login'>Login</Link>
						</li>
						<li>
							<Link to='/signup'>Signup</Link>
						</li>
					</>
				)}
				{user && (
					<li>
						{!isPending && (
							<button onClick={logout} className='btn'>
								Logout
							</button>
						)}
						{isPending && (
							<button disabled className='btn'>
								Logging out
							</button>
						)}
					</li>
				)}
			</ul>
		</div>
	)
}
