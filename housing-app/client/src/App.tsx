import '../css/index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProtectedRoutesWrapper from './ProtectedRoutesWrapper';

// Components
import Navbar from '../components/global/Navbar'
import Footer from '../components/global/Footer'

// Pages
import Home from            '../pages/Home'
import HouseDetail from     '../pages/HouseDetail'
import Login from           '../pages/Login'
import Profil from          '../pages/Profil'
import Register from        '../pages/Register'
import ApplicationPage from '../pages/Application';
import UserApplication from '../pages/UserApplication'
import About from           '../pages/About'
import Contact from         '../pages/Contact'
import Confirmed from       '../pages/Confirmed'
import AcceptOffer from     '../pages/AcceptOffer'
import Payment from         '../pages/Payment'

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(false);
  }
  }, []);

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
        <Route path='/about'            element={<About           />} />
        <Route path='/contact'          element={<Contact         />} />
        <Route path="/profil"           element={<Profil          />} />
        <Route 
          path='/confirmed/:username/:houseId'   
          element={<Confirmed />}
          // element={<ProtectedRoutesWrapper isAuthenticated={isAuthenticated}><Confirmed /></ProtectedRoutesWrapper>} 
        />
        <Route 
          path='/payment/:username/:houseId' 
          element={<Payment />}
          // element={<ProtectedRoutesWrapper isAuthenticated={isAuthenticated}><Payment /></ProtectedRoutesWrapper>} 
        />
        <Route 
          path='/userapplication/:username'   
          element={<UserApplication />}
          // element={<ProtectedRoutesWrapper isAuthenticated={isAuthenticated}><UserApplication /></ProtectedRoutesWrapper>} 
        />
        <Route 
          path='/acceptoffer/:username/:houseId' 
          element={<AcceptOffer />}
          // element={<ProtectedRoutesWrapper isAuthenticated={isAuthenticated}><AcceptOffer /></ProtectedRoutesWrapper>}  
        />
      </Routes>
    <Footer />
  </Router>
</>
  );
};
export default App;