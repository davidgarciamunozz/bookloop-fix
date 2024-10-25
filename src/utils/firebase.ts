let db: any;
let auth: any;

const getFirebaseInstance = async () => {
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

		const where = collection(db, 'products');
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

		const where = collection(db, 'products');
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

