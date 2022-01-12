import './Vehicle.css';
import VehicleContext from '../../context/vehicle/VehicleContext';
import { useContext, useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Vehicle() {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState('');
    const [catalog, setCatalog] = useState([]);
    const {vehicles, fetchVehicles, vehicleIdEmitter, deleteVehicle} = useContext(VehicleContext);

    const bucketUrl = "https://udeyou.s3.sa-east-1.amazonaws.com/"
    
    useEffect(() => {
        const admin = window.sessionStorage.getItem('isAdmin');
        setIsAdmin(admin);
        setCatalog(vehicles);
    }, fetchVehicles);

    const handlePlus = () => {
        navigate('/plus');
    }

    const handleTrash = (id) => {
        if (window.confirm('Are you sure you want to delete it ?')) {
            deleteVehicle(id);
        }
    }

    const handleEdit = (id) => {
        vehicleIdEmitter(id);
        navigate('/edit');
    }

    return (
        <div className="catalog">
            {catalog.map((vehicle) => (
                <div className="card">
                    <div className="img">
                        <img src={bucketUrl + vehicle.imagePath}  alt="" />
                    </div>
                    <div className="vehicle-info">
                        <div className="upper-block">
                            <h2 className="name" style={{color: 'white'}}>{vehicle.name}</h2>
                            <h2 className="price" style={{color: 'green'}}>$2K</h2>
                        </div>
                        <div className="bottom-block">
                            <div className="text-block">
                                <div className="model" style={{color: 'white'}}>{vehicle.model}</div>
                                <div className="brand" style={{color: 'white'}}>{vehicle.brand}</div>
                            </div>
                            {isAdmin === 'true' && (
                                <div className="icon-block">
                                    <FaPlus className="icon" onClick={handlePlus} />
                                    <FaTrash className="icon" onClick={() => {handleTrash(vehicle.id)}} />
                                    <FaEdit className="icon" onClick={() => {handleEdit(vehicle.id)}} />
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
