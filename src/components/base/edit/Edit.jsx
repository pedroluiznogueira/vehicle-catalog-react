import AdminNavbar from './../../shared/adminavbar/AdminNavbar';
import { useState, useContext } from 'react';
import './Edit.css';
import VehicleContext from '../../context/vehicle/VehicleContext';

const vehicle = {
    name: '',
    brand: '',
    model: '',
    imagePath: ''
}

function Edit() {
    const [nameText, setNameText] = useState('');
    const [brandText, setBrandText] = useState('');
    const [modelText, setModelText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const {uploadFile, updateVehicle} = useContext(VehicleContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append(
            "file",
            selectedFile,
            selectedFile.name
        );

        uploadFile(formData);

        vehicle.name = nameText;
        vehicle.brand = brandText;
        vehicle.model = modelText;
        vehicle.imagePath = selectedFile.name;

        updateVehicle(vehicle);
    }

    const onFileChange = (e) => {
        setSelectedFile(e.target.files[0])
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

    return (
        <>
            <AdminNavbar />
            <div className="container">
                <form className="plus-form" onSubmit={handleSubmit}>
                    <h3>Update Vehicle</h3>
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
                        <label id="image-label" htmlFor="image">Upload Image</label>
                        <input onChange={onFileChange} id="image" type="file" />    
                    </div>
                    <div className="input-block">
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Edit;
