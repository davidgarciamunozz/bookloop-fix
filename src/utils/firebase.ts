import { browserLocalPersistence } from 'firebase/auth';
import { appState } from '../store/index';

let db: any;
let auth: any;

export const getFirebaseInstance = async () => {
	if (!db) {
		const { firebaseConfig } = await import('./firebase.config');
		const { getFirestore } = await import('firebase/firestore');
		const { initializeApp } = await import('firebase/app');
		const { getAuth } = await import('firebase/auth');

		// Your web app's Firebase configuration
		//IMPORTANT: delete the firebaseConfig when you push to a public repository
		//firebaseConfig is in the .gitignore file

		const app = initializeApp(firebaseConfig);
		db = getFirestore(app);
		auth = getAuth(app);
	}
	return { db, auth };
};

export const addPublications = async (product: any) => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, addDoc } = await import('firebase/firestore');

		const where = collection(db, 'publications');
		await addDoc(where, product);
		console.log('Se añadió con exito');
	} catch (error) {
		console.error('Error adding document', error);
	}
};

export const getPublications = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'publications');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};

export const registerUser = async (credentials: any) => {
	try {
		const { auth, db } = await getFirebaseInstance();
		const { createUserWithEmailAndPassword } = await import('firebase/auth');
		const { doc, setDoc } = await import('firebase/firestore');

		const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);

		const where = doc(db, 'users', userCredential.user.uid);
		const data = {
			userName: credentials.userName,
			name: credentials.name,
		};

		await setDoc(where, data);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export const loginUser = async (email: string, password: string) => {
	try {
		const { auth } = await getFirebaseInstance();
		const { signInWithEmailAndPassword, setPersistence, browserLocalPersistence } = await import('firebase/auth');

		setPersistence(auth, browserLocalPersistence)
			.then((() => {
				return signInWithEmailAndPassword(auth, email, password);
			})).catch((error: any) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
			});
	} catch (error) {
		console.error(error);
	}
};

export const getDiscoverCards = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'discover');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};

// Note: the missing functions to create are found in the video of the last class

// Create a function that adds the elements to the database based on the user's id
export const addClubsCards = async (clubData: any) => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, addDoc } = await import('firebase/firestore');

        const userId = appState.user;
        if (!userId) {
            console.error("User ID not found in app state.");
            return;
        }

        const clubsRef = collection(db, 'clubs');
        await addDoc(clubsRef, { ...clubData, userId });
        console.log('Club added successfully');
    } catch (error) {
        console.error('Error adding club', error);
    }
};


// Modify the getClubsCards function so that it only returns the user's clubs
export const getClubsCards = async () => {
    try {
        const { db } = await getFirebaseInstance();
        const { collection, getDocs, query, where } = await import('firebase/firestore');

        const userId = appState.user;
        if (!userId) {
            console.error("User ID not found in app state.");
            return [];
        }

        const clubsRef = collection(db, 'clubs');
        const userClubsQuery = query(clubsRef, where('userId', '==', userId));
        const querySnapshot = await getDocs(userClubsQuery);

        const data: any[] = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });

        return data;
    } catch (error) {
        console.error('Error getting documents', error);
    }
};

export const getUserName = async () => {
	try {
		const { db } = await getFirebaseInstance();
		const { collection, getDocs } = await import('firebase/firestore');

		const where = collection(db, 'users');
		const querySnapshot = await getDocs(where);
		const data: any[] = [];

		querySnapshot.forEach((doc) => {
			data.push(doc.data());
		});

		return data;
	} catch (error) {
		console.error('Error getting documents', error);
	}
};