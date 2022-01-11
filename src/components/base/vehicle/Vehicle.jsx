import './Vehicle.css';
import webmotors from '../../shared/assets/webmotors.jpg';
import VehicleContext from '../../context/vehicle/VehicleContext';
import { useContext, useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Vehicle() {
    const [catalog, setCatalog] = useState([]);
    const [isAdmin, setIsAdmin] = useState('');
    const navigate = useNavigate();
    const {vehicles, fetchVehicles} = useContext(VehicleContext);

    
    useEffect(() => {
        const admin = window.sessionStorage.getItem('isAdmin');
        setIsAdmin(admin);
        setCatalog(vehicles);
    }, fetchVehicles);

    const handlePlus = () => {
        console.log('plus');
        navigate('/plus');
    }

    const handleTrash = () => {
        if (window.confirm('Are you sure you want to delete it ?')) {
            console.log('trash');
            navigate('/trash');
        }
    }

    const handleEdit = () => {
        console.log('edit');
        navigate('/edit');
    }

    return (
        <div className="catalog">
            {catalog.map((vehicle) => (
                <div className="card">
                    <div className="img">
                        <img src={webmotors} alt="" />
                    </div>
                    <div className="vehicle-info">
                        <div className="upper-block">
                            <h2 className="name" style={{color: 'white'}}>{vehicle.name}</h2>
                            <h2 className="price">$2K</h2>
                        </div>
                        <div className="bottom-block">
                            <div className="text-block">
                                <div className="model" style={{color: 'white'}}>{vehicle.model}</div>
                                <div className="brand" style={{color: 'white'}}>{vehicle.brand}</div>
                            </div>
                            {isAdmin === 'false' && (
                                <div className="icon-block">
                                    <FaPlus className="icon" onClick={handlePlus} />
                                    <FaTrash className="icon" onClick={handleTrash} />
                                    <FaEdit className="icon" onClick={handleEdit} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Vehicle;
