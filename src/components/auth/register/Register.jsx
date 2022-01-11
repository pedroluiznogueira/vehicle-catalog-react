import { NavLink } from "react-router-dom";
import './Register.css';

function Register() {
    const handleSubmit = (e) => {
    }

    const handleNameChange = (e) => {
    }

    const handleEmailChange = (e) => {
    }

    const handlePasswordChange = (e) => {
    }

    return(
        <div className="container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h1>Cadastro</h1>
                <div className="form-group">
                    <label htmlFor="exampleInputNome">Nome</label>
                    <input
                        onChange={handleNameChange}
                        type="text" 
                        className="form-control" 
                        id="exampleInputNome" 
                        aria-describedby="emailHelp" 
                        placeholder="Name" 
                        name="name"
    
                    />
                </div>
                <div className="form-group">
                <label htmlFor="exampleInputEmail1">E-mail</label>
                <input
                    onChange={handleEmailChange}
                    type="email" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    aria-describedby="emailHelp" 
                    placeholder="Email" 
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
                        <NavLink className="question-text" to='/login' style={{ textDecoration: 'none' }}>
                            Já tem uma conta ?
                        </NavLink>
                    </small>
                </div>
                <button className="btn" type="submit">Criar conta</button>
            </form>
        </div>
    );
}

export default Register;
