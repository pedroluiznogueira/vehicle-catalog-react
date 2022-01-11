import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    
    const handleClick = () => {
        window.sessionStorage.setItem('mockedToken', 'mockedToken');
        navigate('/app');
    }

    return (
            <button onClick={handleClick}>Login</button>
    )
}

export default Login;
