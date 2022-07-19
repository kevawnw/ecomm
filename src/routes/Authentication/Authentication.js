import './authentication.scss'
import SignIn from '../../Component/sign-in/SignIn'
import Signup from '../../Component/sign-up/Signup'



function Authentication() {
 
  return (
    <div className='authentication-container'>
        <SignIn/>
        <Signup/>
    </div>
  )
}

export default Authentication