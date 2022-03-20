import { useState, useEffect } from 'react'
import { auth, storage, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false)
	const [error, setError] = useState(null)
	const [isPending, setIsPending] = useState(false)
	const { dispatch } = useAuthContext()

	const signup = async (email, password, displayName, thumbnail) => {
		setError(null)
		setIsPending(true)

		try {
			// signup
			const res = await auth.createUserWithEmailAndPassword(email, password)

			if (!res) {
				throw new Error('Could not complete signup')
			}

			// upload user thumbnail
			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
			const img = await storage.ref(uploadPath).put(thumbnail)
			const imgUrl = await img.ref.getDownloadURL()

			// add display name to user
			await res.user.updateProfile({ displayName, photoURL: imgUrl })

			// create a user document in db

			await db.collection('users').doc(res.user.uid).set({
				online: true,
				displayName,
				photoURL: imgUrl,
			})

			// dispatch login action
			dispatch({ type: 'LOGIN', payload: res.user })

			if (!isCancelled) {
				setIsPending(false)
				setError(null)
			}
		} catch (err) {
			if (!isCancelled) {
				setError(err.message)
				setIsPending(false)
			}
		}
	}

	useEffect(() => {
		return () => setIsCancelled(true)
	}, [])

	return { signup, error, isPending }
}
