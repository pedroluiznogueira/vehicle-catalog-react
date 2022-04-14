import VehicleContext from '../../context/vehicle/VehicleContext';
import { useContext, useState, useEffect } from 'react';
import { FaTrash, FaPlus, FaEdit } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Vehicle.css';

function Vehicle() {
    const {vehicles, vehicleIdEmitter, deleteVehicle, formGoalEmitter, findById, isAdmin} = useContext(VehicleContext);
    const navigate = useNavigate();
    
    const bucketUrl = "https://udeyou.s3.sa-east-1.amazonaws.com/";

    useEffect(() => {
        findById(window.sessionStorage.getItem('logged'));
    }, []);

    const handlePlus = () => {
        formGoalEmitter('plus');
        navigate('/form');
    }
    
    const handleEdit = (id) => {
        vehicleIdEmitter(id);
        formGoalEmitter('edit');
        navigate('/form');
    }
    
    const handleTrash = (id) => {
        if (window.confirm('Are you sure you want to delete it ?')) deleteVehicle(id);
    }

    return (
        <div className="catalog">
            {vehicles.sort(function compare(a, b) {if (a.price < b.price) return -1; if (a.price > b.price) return 1; return 0}).map((vehicle) => (
                <div className="card">
                    <div className="img">
                        <img src={bucketUrl + vehicle.imagePath}  alt="" />
                    </div>
                    <div className="vehicle-info">
                        <div className="upper-block">
                            <h2 className="name" style={{color: 'white'}}>{vehicle.name}</h2>
                            <h2 className="price" style={{color: 'green'}}>$ {vehicle.price}</h2>
                        </div>
                        <div className="bottom-block">
                            <div className="text-block">
                                <div className="model" style={{color: 'white'}}>{vehicle.model}</div>
                                <div className="brand" style={{color: 'white'}}>{vehicle.brand}</div>
                            </div>
                            {isAdmin === true && (
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
