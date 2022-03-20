import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
	apiKey: 'AIzaSyBd3CZc4Z3maArr8qR8P4zfDHDw-GUouZE',
	authDomain: 'sundaydotcom-6c344.firebaseapp.com',
	projectId: 'sundaydotcom-6c344',
	storageBucket: 'sundaydotcom-6c344.appspot.com',
	messagingSenderId: '14375940959',
	appId: '1:14375940959:web:36e410ae83ee96041b7cea',
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
export const timestamp = firebase.firestore.Timestamp
