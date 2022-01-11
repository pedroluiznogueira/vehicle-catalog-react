import './Vehicle.css';
import webmotors from '../../shared/assets/webmotors.jpg';

function Vehicle() {
    return (
        <div className="catalog">
            <div className="card">
                <div className="img">
                    <img src={webmotors} alt="" />
                </div>
                <div className="vehicle-info">
                    <div className="upper-block">
                        <h2 className="name" style={{color: 'white'}}>UP</h2>
                        <h2 className="price">$2K</h2>
                    </div>
                    <div className="bottom-block">
                        <div className="model" style={{color: 'white'}}>UP TSI TURBO ENGINE</div>
                        <div className="brand" style={{color: 'white'}}>Volkswagen</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Vehicle;
