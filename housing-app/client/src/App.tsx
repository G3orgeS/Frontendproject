import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Använd BrowserRouter
import '../css/index.css'
import Home from '../pages/Home'
import HouseDetail from '../pages/HouseDetail'
// import HouseList from '../pages/HouseList'
import Login from '../pages/Login'
import Register from '../pages/Register'
import About from '../pages/About'
// import Profil from '../pages/Profil'
import Footer from '../components/Footer'

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
          {/* <Route path='/houselist' element={<HouseList />} /> */}
          <Route path='/about' element={<About />} />
          {/* <Route path='/profil' element={<Profil />} /> */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;