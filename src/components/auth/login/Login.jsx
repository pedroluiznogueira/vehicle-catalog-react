import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from 'react';
import UserContext from "../../context/user/UserContext";
import spinner from '../../shared/assets/spinner.gif';
import VehicleContext from "../../context/vehicle/VehicleContext";
import './Login.css';

const user = {
    email: '',
    password: ''
}

function Login() {
    const navigate = useNavigate();
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { authenticate } = useContext(UserContext);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        user.email = emailText;
        user.password = passwordText;
        
        setIsLoading(true);
        const promise = authenticate(user);
        promise
            .then(
                (data) => {
                    setTimeout(() => {
                        setIsLoading(false);
                        window.sessionStorage.setItem('token', data.token);
                        window.sessionStorage.setItem('logged', JSON.stringify(data.userId));
                        window.sessionStorage.setItem('isAdmin', JSON.stringify(data.isAdmin));
                        navigate('/app', { replace: true });
                    }, 2000)
                }
            );
        
        setEmailText('');
        setPasswordText('');
    }

    const handleEmailChange = (e) => {
        setEmailText(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setPasswordText(e.target.value)
    }


    return(
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">E-mail</label>
                    <input
                        onChange={handleEmailChange}
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter email" 
                        name="email"
                        value={emailText}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input
                        onChange={handlePasswordChange}
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                        name="password"
                        value={passwordText}                    
                    />
                </div>
                <div className="form-group-question">
                    <small>
                        <NavLink className="question-text" to='/register' style={{ textDecoration: 'none' }}>
                            Don't you have an account ?
                        </NavLink>
                    </small>
                </div>
                {
                    isLoading ?
                    <img 
                        src={spinner}
                        style={{width: '50px'}}
                    /> : 
                    <button className="btn" type="submit">Login</button>
                }
            </form>
        </div>
    );
}

export default Login;
