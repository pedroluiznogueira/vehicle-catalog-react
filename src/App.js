import './App.css';
import Vehicle from './components/base/vehicle/Vehicle';
import Navbar from './components/shared/navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Vehicle />
      </div>
    </>
  );
}

export default App;
