import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithRedirect,
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyDppAi2UnOryYFyRyEDOy_cDHEMVshv_8E",
    authDomain: "react-crown-clothing-9e097.firebaseapp.com",
    projectId: "react-crown-clothing-9e097",
    storageBucket: "react-crown-clothing-9e097.appspot.com",
    messagingSenderId: "570767814079",
    appId: "1:570767814079:web:e388b13d344b9265c4450a"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})
// Github provider
const githubProvider = new GithubAuthProvider();
githubProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const signInWithGithubPopup = () => signInWithPopup(auth, githubProvider);

const db = getFirestore();

export const createCollectionShopData = async (collectionKey, objectsToAdd) => {
    // get a collection and create new if not exist
    const collectionRef = collection(db, collectionKey);
    // start the transaction
    const batch = writeBatch(db);
    objectsToAdd.forEach(object => {
        // create a doc from above collection
        const docRef = doc(collectionRef, object.title.toLowerCase());
        // Set value for the doc
        batch.set(docRef, object);
    });
    // await for the transaction to complete
    await batch.commit();
    console.log("done!");
}

export const createUserToFireStore = async (userAuth, additionalData = {}) => {
    if (!userAuth) return;

    // create user document
    const userDocRef = await doc(db, 'users', userAuth.uid);
    // Take user document data from google
    const userSnapShot = await getDoc(userDocRef);
    // Checking that user document data is exist
    // if not => store data in firestore through setDoc method
    if (!userSnapShot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalData
            });
        } catch (error) {
            console.log("Failed to create user!", error.message);
        }
    }
    // if yes just return userDocRef
    return userDocRef;
}

export const getCollectionData = async (collectionKey) => {
    const collectionRef = await collection(db, collectionKey);
    const queryRef = query(collectionRef);
    const querySnapShot = await getDocs(queryRef);
    const data = querySnapShot.docs.reduce((continuity, docObject) => {
        const { title, items } = docObject.data();
        continuity[title.toLowerCase()] = items;
        return continuity;
    }, {});
    return data;
}

export const createAuthUserFromEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
    await signOut(auth);
}

export const onAuthStateChangedListener = async (callback) => {
    return await onAuthStateChanged(auth, callback);
}