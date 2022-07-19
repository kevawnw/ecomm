import {useState} from 'react'
import FormInput from '../form-input/FormInput'
import './signIn.scss'
import Button from '../button/Button'
import {createUserDocumentFromAuth, signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase'

const defaultFormFields = {
    
    email: '',
    password: '',
   
}

function SignIn() {

const [formFields, setFormFields] = useState(defaultFormFields)
const {email, password } = formFields

console.log(formFields)

function resetForm(){
    setFormFields(defaultFormFields)
}

const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }
  

function handleChange(event){
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
}

async function handleSubmit(event){
    event.preventDefault();
  

    try{
        const response = await signInAuthUserWithEmailAndPassword(email, password)
        console.log(response)
        resetForm()
    } catch(error){
        switch(error.code){
            case 'auth/wrong-password':
                alert('incorrect password')
            break
            case 'auth/user-not-found':
                alert('no user found')
            break
            default:
                console.log(error)
        }
        
    }
}


  return (
      <div className='sign-up-container'>
          <h2>I already have an Account</h2>
          <span>Sign in with your email and password</span>
          <form onSubmit={handleSubmit}>
              <FormInput label='Email' type='email' required name='email' onChange={handleChange} value={email} />
              <FormInput label='Password' type='password' required name='password' onChange={handleChange} value={password} />

              <div className='buttons-container'>
                  <Button type='submit'>Sign In</Button>
                  <Button buttonType='google' type='button' onClick={signInWithGoogle}>Google sign in</Button>
              </div>
          </form>
      </div>
  )
}

export default SignIn