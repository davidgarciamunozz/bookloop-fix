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