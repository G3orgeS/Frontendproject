import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Använd BrowserRouter
import '../css/index.css'
import Home from '../pages/Home'
import HouseDetail from '../pages/HouseDetail'
import Login from '../pages/Login'
import Profil from '../pages/Profil'
import Register from '../pages/Register'
import Footer from '../components/Footer'
import ApplicationPage from '../pages/Application';
import UserApplication from '../pages/UserApplication'

const App = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/housedetail/:id' element={<HouseDetail />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/application/:id' element={<ApplicationPage />} />
          <Route path='/userApplication' element={<UserApplication />}/>
          {/* <Route path='/houselist' element={<HouseList />} /> */}
          <Route path='/profil' element={<Profil />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;