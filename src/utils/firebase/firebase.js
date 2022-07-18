import { initializeApp } from 'firebase/app'
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDt0u0srws2zAP6wwapwvoHPUY_KNKQ8OU",
    authDomain: "ecomm-e5acb.firebaseapp.com",
    projectId: "ecomm-e5acb",
    storageBucket: "ecomm-e5acb.appspot.com",
    messagingSenderId: "662613712638",
    appId: "1:662613712638:web:34a63de3c5b7d4e1f88faf"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider()

  provider.setCustomParameters({
    prompt: 'select_account'
  })

  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

  export const db = getFirestore()

 export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid)
   
    const userSnapshot = await getDoc(userDocRef)
  

    if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch(error){
            console.log('error creating user', error.message)
        }
    }
    return userDocRef
  }

