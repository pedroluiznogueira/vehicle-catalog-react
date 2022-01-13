import { createContext, useState, useEffect } from 'react';
import axios from "axios";

const VehicleContext = createContext();

export const VehicleProvider = ( {children} ) => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState(null);
    const [formGoal, setFormGoal] = useState('');

    const token = window.sessionStorage.getItem('token');
    const userId = window.sessionStorage.getItem('logged');
    const url = 'https://vehicle-catalog-api.herokuapp.com';

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        const response = await fetch(`${url}/vehicles/find/all`, {
            method: 'GET',
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        setVehicles(data);
    }

    const uploadFile = async (formData) => {
        const response = await axios.post(`${url}/upload-file`, formData, {
            headers: {'Authorization': 'Bearer ' + token}
        });
    }

    const formGoalEmitter = (goal) => {
        setFormGoal(goal);
    }

    const registerVehicle = async (vehicle) => { 
        const response = await fetch(`${url}/vehicles/register/${userId}`, {
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
        const response = await fetch(`${url}/vehicles/update/${vehicleId}/user/${userId}`, {
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
        const response = await fetch(`${url}/vehicles/delete/${vehicleId}/user/${userId}`, {
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
            formGoal: formGoal,
            vehicleIdEmitter: vehicleIdEmitter,
            formGoalEmitter: formGoalEmitter,
            uploadFile: uploadFile,
            registerVehicle: registerVehicle,
            updateVehicle: updateVehicle,
            deleteVehicle: deleteVehicle,
        }}>
            {children}
        </VehicleContext.Provider>
    );
}

export default VehicleContext;