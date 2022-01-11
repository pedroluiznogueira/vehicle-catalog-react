import './Vehicle.css';
import webmotors from '../../shared/assets/webmotors.jpg';
import VehicleContext from '../../context/vehicle/VehicleContext';
import { useContext } from 'react';

function Vehicle() {
    const {vehicles} = useContext(VehicleContext);
    
    return (
        <div className="catalog">
            {vehicles.map((vehicle) => (
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
