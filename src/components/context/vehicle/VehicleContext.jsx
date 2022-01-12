import { createContext, useState, useEffect } from 'react';
import axios from "axios";

const VehicleContext = createContext();

export const VehicleProvider = ( {children} ) => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState(null);
    const [formGoal, setFormGoal] = useState(''); 

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        let token = window.sessionStorage.getItem('token');

        const response = await fetch('http://localhost:8080/vehicles/find/all', {
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
        const response = await axios.post("http://localhost:8080/upload-file", formData);
        const data = response.json();
    }

    const formGoalEmitter = (goal) => {
        console.log(goal);
        setFormGoal(goal);
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