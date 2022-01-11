import AdminNavbar from "../../shared/adminavbar/AdminNavbar";
import './Plus.css';

function Plus() {
    return (
        <>
            <AdminNavbar />
            <div className="container">
                <form className="plus-form">
                    <h3>Create Vehicle</h3>
                    <div className="input-block">
                        <label htmlFor="name">Name</label>
                        <input id="name" type="text" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="brand">Brand</label>
                        <input id="brand" type="text" />
                    </div>

                    <div className="input-block">
                        <label htmlFor="model">Model</label>
                        <input id="model" type="text" />    
                    </div>

                    <div className="input-block">
                        <label id="image-label" htmlFor="image">Upload Image</label>
                        <input id="image" type="file" />    
                    </div>

                    <div className="input-block">
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Plus;
