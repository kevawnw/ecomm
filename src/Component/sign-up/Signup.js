import {useState} from 'react'
import FormInput from '../form-input/FormInput'
import './signUp.scss'
import Button from '../button/Button'
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase'

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

function Signup() {

const [formFields, setFormFields] = useState(defaultFormFields)
const {displayName, email, password, confirmPassword } = formFields

console.log(formFields)

function resetForm(){
    setFormFields(defaultFormFields)
}

function handleChange(event){
    const {name, value} = event.target
    setFormFields({...formFields, [name]: value})
}

async function handleSubmit(event){
    event.preventDefault();
    if(password !== confirmPassword) {
        console.log("invalid")
        return;
    }

    try{
        const {user} = await createAuthUserWithEmailAndPassword(email, password)
        await createUserDocumentFromAuth(user, {displayName})
        resetForm()
        
    } catch(error){
        if(error.code === 'auth/email-already-in-use'){
            alert("cannot create user, email already exist")
        } else console.log(error)
    }
}


  return (
    <div className='sign-up-container'>
        <h2>Don't have an Account?</h2>
        <span>Sign up with email and password</span>
        <form onSubmit={handleSubmit}>
            
            <FormInput label='Display Name' type='text' required name='displayName' onChange={handleChange} value={displayName}/>

            
            <FormInput label='Email' type='email' required name='email' onChange={handleChange} value={email}/>

            
            <FormInput label='Password' type='password' required name='password' onChange={handleChange} value={password}/>

            
            <FormInput label='Confirm Password' type='password' required name='confirmPassword' onChange={handleChange} value={confirmPassword}/>

            <Button type='submit'>Sign up</Button>
        </form>
    </div>
  )
}

export default Signup