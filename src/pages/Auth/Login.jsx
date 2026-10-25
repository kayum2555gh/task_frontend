import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Authstyle.css'
import AuthServices from '../../Services/AuthServices'
import toast from 'react-hot-toast'
import { getErrorMessage } from '../../utils/ErrorMessage'

const Login = () => {

    let[email, setEmail] = useState('');
    let[password, setPassword] = useState('');
    const navigate = useNavigate();

    let loginHandler  = async (e) =>{
       try {
        e.preventDefault();
        const data = {email, password};
        const res = await AuthServices.loginUser(data);
        toast.success(res.data.message);
        navigate('/home');
        localStorage.setItem("todoapp", JSON.stringify(res.data))
        console.log(res.data);

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
                    not a user? please
                    <Link to="/register">Register</Link>
                </p>
                <button className='login-btn' type='submit'  onClick={loginHandler}>Login</button>
            </div>
        </div>

    </div>
  )
}

export default Login