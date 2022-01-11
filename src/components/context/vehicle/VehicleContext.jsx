import { createContext, useState, useEffect } from 'react';

const VehicleContext = createContext();

export const VehicleProvider = ( {children} ) => {
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        let token = window.sessionStorage.getItem('token');
        const response = await fetch('http://localhost:8080/vehicles/find/all', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        });
        const data = await response.json();
        console.log(data);
        setVehicles(data);
        return data;
    }

    const registerVehicle = async (vehicle) => {
        console.log(vehicle);
    }

    return(
        <VehicleContext.Provider value={{
            vehicles: vehicles
        }}>
            {children}
        </VehicleContext.Provider>
    );
}

export default VehicleContext;