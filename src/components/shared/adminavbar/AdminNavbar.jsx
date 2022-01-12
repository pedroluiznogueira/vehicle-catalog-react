import { useNavigate } from "react-router-dom";

function AdminNavbar() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/app');
    }

    return (
        <nav className="navbar">
            <div className="logo-block">
                <h1 className="logo">Admin Panel</h1>
            </div>
            <div className="logout-block">
                <h1 onClick={handleClick} className="logout">Go Back</h1>
            </div>
        </nav>
    )
}

export default AdminNavbar;
