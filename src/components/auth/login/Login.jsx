import { NavLink, useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
    const navigate = useNavigate();
    
    const handleSubmit = (e) => {
        window.sessionStorage.setItem('mockedToken', 'mockedToken');
        navigate('/app');
    }

    const handleEmailChange = (e) => {
    }

    const handlePasswordChange = (e) => {
    }

    return(
        <div className="container">
            <form className="form" onSubmit={handleSubmit}>
                <h1>Login</h1>
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

                    />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Senha</label>
                    <input
                        onChange={handlePasswordChange}
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Password" 
                        name="password" 
                    
                    />
                </div>
                <div className="form-group-question">
                    <small>
                        <NavLink className="question-text" to='/register' style={{ textDecoration: 'none' }}>
                            Ainda não tem uma conta ?
                        </NavLink>
                    </small>
                </div>
                <button className="btn" type="submit">Entrar</button>
            </form>
        </div>
    );
}

export default Login;
