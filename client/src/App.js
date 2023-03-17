import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import LandingPage from './components/LandingPage/LandingPage';
import DetailPage from './components/DetailPage/DetailPage';
import FormPage from './components/FormPage/FormPage';

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/detail/:idRecipe' element={<DetailPage/>} />
        <Route path='/create' element={<FormPage/>} />
      </Routes>
    </div>
  );
};

export default App;
