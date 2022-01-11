import './Vehicle.css';
import webmotors from '../../shared/assets/webmotors.jpg';
import VehicleContext from '../../context/vehicle/VehicleContext';
import { useContext, useState, useEffect } from 'react';

function Vehicle() {
    const [catalog, setCatalog] = useState([]);    
    const {vehicles} = useContext(VehicleContext);

    useEffect(() => {
        setCatalog(vehicles);
        console.log(catalog);
    });
    
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
                            <div className="model" style={{color: 'white'}}>{vehicle.model}</div>
                            <div className="brand" style={{color: 'white'}}>{vehicle.brand}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Vehicle;
