import { auth, signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from '../../utils/firebase/firebase'
import {useEffect} from 'react'
import { getRedirectResult } from 'firebase/auth'

import Signup from '../../Component/sign-up/Signup'



function SignIn() {
 
 
  useEffect(() => {
    const fetchdata = async () => {
      const response = await getRedirectResult(auth)
      console.log(response)

      if(response){
        const userDocRef = await createUserDocumentFromAuth(response.user)
      }
    }
    fetchdata()
  }, [])



  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopup()
    const userDocRef = await createUserDocumentFromAuth(user)
  }
  
  return (
    <div>
        <h1>sign in page</h1>
        <button onClick={logGoogleUser}>Sign in With Google Popup</button>
        <Signup/>
        
    </div>
  )
}

export default SignIn