import { createContext, useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const VehicleContext = createContext();

export const VehicleProvider = ( {children} ) => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState(null);

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
        setVehicles(data);
        return data;
    }

    const uploadFile = async (formData) => {
        const response = await axios.post("http://localhost:8080/upload-file", formData);
        const data = response.json();
    }

    const registerVehicle = async (vehicle) => {
        let token = window.sessionStorage.getItem('token');
        const userId = window.sessionStorage.getItem('logged');

        const response = await fetch(`http://localhost:8080/vehicles/register/${userId}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(vehicle)
        });
        const data = await response.json();
        setVehicles([data, ...vehicles]);
        return data;
    }

    const vehicleIdEmitter = (id) => {
        setVehicleId(id);
    }

    const updateVehicle = async (vehicle) => {
        let token = window.sessionStorage.getItem('token');
        const userId = window.sessionStorage.getItem('logged');

        const response = await fetch(`http://localhost:8080/vehicles/update/${vehicleId}/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(vehicle)
        });
        const data = await response.json();
        setVehicles(
            vehicles.map((vehicle) => (vehicle.id === vehicleId ? {...vehicle, ...data}: vehicle))
        ); 
        return data;
    }

    const deleteVehicle = async (vehicleId) => {
        let token = window.sessionStorage.getItem('token');
        const userId = window.sessionStorage.getItem('logged');

        const response = await fetch(`http://localhost:8080/vehicles/delete/${vehicleId}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleId));
    }

    return(
        <VehicleContext.Provider value={{
            vehicles: vehicles,
            uploadFile: uploadFile,
            registerVehicle: registerVehicle,
            vehicleIdEmitter: vehicleIdEmitter,
            updateVehicle: updateVehicle,
            deleteVehicle: deleteVehicle
        }}>
            {children}
        </VehicleContext.Provider>
    );
}

export default VehicleContext;