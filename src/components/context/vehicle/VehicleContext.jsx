import { createContext, useState, useEffect } from 'react';
import axios from "axios";

const VehicleContext = createContext();

export const VehicleProvider = ( {children} ) => {
    const [vehicles, setVehicles] = useState([]);
    const [vehicleId, setVehicleId] = useState(null);
    const [formGoal, setFormGoal] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const token = window.sessionStorage.getItem('token');
    const userId = window.sessionStorage.getItem('logged');
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        console.log(apiUrl);
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        const response = await fetch(`${apiUrl}/vehicles/find/all`, {
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
        const response = await axios.post(`${apiUrl}/upload-file`, formData, {
            headers: {'Authorization': 'Bearer ' + token}
        });
    }

    const formGoalEmitter = (goal) => {
        setFormGoal(goal);
    }

    const registerVehicle = async (vehicle) => { 
        const response = await fetch(`${apiUrl}/vehicles/register/${userId}`, {
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
        const response = await fetch(`${apiUrl}/vehicles/update/${vehicleId}/user/${userId}`, {
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
        const response = await fetch(`${apiUrl}/vehicles/delete/${vehicleId}/user/${userId}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        setVehicles(vehicles.filter((vehicle) => vehicle.id !== vehicleId));
    }

    const findById = async (id) => {
        const response = await fetch(`${apiUrl}/users/find/by/id/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        const data = response.json();
        data.then((data) => {
            if (data.isAdmin) setIsAdmin(true);
            console.log(data);
        }).catch(() => {
            console.log('error')
        })
        return data;
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
            findById: findById,
            isAdmin: isAdmin
        }}>
            {children}
        </VehicleContext.Provider>
    );
}

export default VehicleContext;