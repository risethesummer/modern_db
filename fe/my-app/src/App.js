import logo from './logo.svg';
// import './App.css';
import DetailHotel from './pages/DetaildHotel/DetailHotel';
import { BrowserRouter as Router, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      {/* <Detail hotelId="64566e8019d1c3aefd4ab4c8"/> */}
      <DetailHotel hotelId="645903428e3040c7442064d5" />
    </div>
  );
}

export default App;
