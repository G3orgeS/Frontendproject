import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Använd BrowserRouter
import '../css/index.css'
import Home from '../pages/Home'
import HouseDetail from '../pages/HouseDetail'
import HouseList from '../pages/HouseList'
import Login from '../pages/Login'
import Register from '../pages/Register'

const App = () => {
  return (
    <>
       <Router> {/* Lägg Router runt hela applikationen */}
    <Navbar />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/housedetail:id' element={<HouseDetail />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/houselist' element={<HouseList />} />
    </Routes>
    </Router>
      </>
  );
};

export default App;