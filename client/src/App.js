import { Routes, Route, useLocation } from 'react-router-dom';

import LandingPage from './components/LandingPage/LandingPage';
import Nav from './components/Nav/Nav';
import HomePage from './components/HomePage/HomePage';
import DetailPage from './components/DetailPage/DetailPage';
import FormPage from './components/FormPage/FormPage';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ExplorePage from './components/ExplorePage/ExplorePage';
import LogIn from './components/LogIn/LogIn';
import LogOut from './components/LogOut/LogOut';
import Register from './components/Register/Register';
import FavPage from './components/FavPage/FavPage';


const App = () => {

  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  
  
  
  return (
    <div className="App">
      {!isLandingPage && <Nav />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/detail/:idRecipe" element={<DetailPage />} />
        <Route path="/create" element={<FormPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<LogOut />} />
        <Route path="/register" element={<Register />} />
        <Route path="/favorites" element={<FavPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
};

export default App;