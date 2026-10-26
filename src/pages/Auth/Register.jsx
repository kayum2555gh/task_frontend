import { useState } from 'react';
import {Link,useNavigate} from 'react-router-dom'
import './Authstyle.css'
import AuthServices from '../../Services/AuthServices';
import toast from 'react-hot-toast';
import { getErrorMessage } from '../../utils/ErrorMessage';


const Register = () => {

    let[email, setEmail] = useState('');
    let[password, setPassword] = useState('');
    let[username, setUsername] = useState('');

    const navigate  = useNavigate();
 
    let registerHandler  = async (e) =>{
        e.preventDefault();
        try {
        e.preventDefault();
        const data = {email, password,username};
        const res = await AuthServices.registerUser(data);
        toast.success(res.data.message);
        navigate('/login');

       } catch (err) {
        toast.error(getErrorMessage(err));
        console.log(err);
       }
    }
    
return (
    <div className="form-container">
        <div className="form">
            <div className="mb-3">
                <i className='fa-solid fa-circle-user'></i>
            </div>
            <div className="mb-3">
                <input type="text"
                    className='form-control'
                    placeholder='Enter username'
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    />
            </div>
            <div className="mb-3">
                <input type="email"
                    className='form-control'
                    placeholder='Enter email'
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    />
            </div>
            <div className="mb-3">
                <input type="password"
                    className='form-control'
                    placeholder='Enter password'
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    />
            </div>
            
            <div className="form-bottom">
                <p className="text-center">
                    already a user. please
                    <Link to="/login">Login</Link>
                </p>
                <button className='login-btn' type='submit'  onClick={registerHandler}>Register</button>
            </div>
        </div>

    </div>
  )
}

export default Register;