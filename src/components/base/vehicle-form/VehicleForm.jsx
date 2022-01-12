import AdminNavbar from './../../shared/adminavbar/AdminNavbar';
import { useState, useContext } from 'react';
import VehicleContext from '../../context/vehicle/VehicleContext';
import spinner from '../../shared/assets/spinner.gif';
import { useNavigate } from 'react-router-dom';
import './VehicleForm.css';

const vehicle = {
    name: '',
    brand: '',
    model: '',
    imagePath: '',
    price: null
}

function VehicleForm() {
    const navigate = useNavigate();
    const [nameText, setNameText] = useState('');
    const [brandText, setBrandText] = useState('');
    const [modelText, setModelText] = useState('');
    const [priceNumber, setPriceNumber] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const {uploadFile, updateVehicle, registerVehicle, formGoal} = useContext(VehicleContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();
        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        uploadFile(formData);
        handleVehicle(formGoal);
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
    }

    const handleVehicle = (goal) => {
        vehicle.name = nameText;
        vehicle.brand = brandText;
        vehicle.model = modelText;
        vehicle.imagePath = selectedFile.name;
        vehicle.price = priceNumber;

        if (formGoal === 'plus') {
            const promise = registerVehicle(vehicle);
            promise.then(() => {
                setTimeout(() => {
                    setIsLoading(false)
                    navigate('/app');
                }, 2000);
            });

        } else {
            const promise = updateVehicle(vehicle);
            promise.then(() => {
                setTimeout(() => {
                    setIsLoading(false);
                    navigate('/app');
                }, 2000);
            });
        }
    }

    const handleNameChange = (e) => {
        setNameText(e.target.value);
    }

    const handleBrandChange = (e) => {
        setBrandText(e.target.value);
    }

    const handleModelChange = (e) => {
        setModelText(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPriceNumber(e.target.value);
    }

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <form className="plus-form" onSubmit={handleSubmit}>
                    <h3>Vehicle {formGoal}</h3>
                    <div className="input-block">
                        <label htmlFor="name">Name</label>
                        <input 
                            id="name" 
                            type="text" 
                            value={nameText}
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className="input-block">
                        <label htmlFor="brand">Brand</label>
                        <input 
                            id="brand" 
                            type="text" 
                            value={brandText}
                            onChange={handleBrandChange}
                        />
                    </div>
                    <div className="input-block">
                        <label htmlFor="model">Model</label>
                        <input 
                            id="model" 
                            type="text" 
                            value={modelText}
                            onChange={handleModelChange}
                        />    
                    </div>
                    <div className="input-block">
                        <label htmlFor="model">Price</label>
                        <input 
                            id="model" 
                            type="number" 
                            value={priceNumber}
                            onChange={handlePriceChange}
                        />    
                    </div>
                    <div className="input-block">
                        <label id="image-label" htmlFor="image">Upload Image</label>
                        <input onChange={onFileChange} id="image" type="file" />    
                    </div>
                    <div id="feedback" className="input-block">
                    {
                    isLoading ?
                    <img
                        src={spinner}
                        style={{width: '50px'}}
                    /> : 
                    <button className="btn" type="submit">Send</button>
                    }
                    </div>
                </form>
            </div>
        </>
    )
}

export default VehicleForm;