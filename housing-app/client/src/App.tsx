import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Använd BrowserRouter
import Navbar from '../components/global/Navbar'
import Footer from '../components/global/Footer'
import Home from '../pages/Home'
import HouseDetail from '../pages/HouseDetail'
import Login from '../pages/Login'
import Profil from '../pages/Profil'
import Register from '../pages/Register'
import ApplicationPage from '../pages/Application';
import UserApplication from '../pages/UserApplication'
import About from '../pages/About'
import Contact from '../pages/Contact'
import Confirmed from '../pages/Confirmed'
import AcceptOffer from '../pages/AcceptOffer'
import Payment from '../pages/Payment'
import '../css/index.css'

const App = () => {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/'                 element={<Home            />} />
          <Route path='/housedetail/:id'  element={<HouseDetail     />} />
          <Route path='/login'            element={<Login           />} />
          <Route path='/register'         element={<Register        />} />
          <Route path='/application/:id'  element={<ApplicationPage />} />
          <Route path='/profil'           element={<Profil          />} />
          <Route path='/about'            element={<About           />} />
          <Route path='/contact'          element={<Contact         />} />
          <Route path='/confirmed/:username/:houseId'   element={<Confirmed       />} />
          <Route path='/payment/:username/:houseId'     element={<Payment         />} />
          <Route path='/userapplication/:username'      element={<UserApplication />} />
          <Route path='/acceptoffer/:username/:houseId' element={<AcceptOffer     />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;