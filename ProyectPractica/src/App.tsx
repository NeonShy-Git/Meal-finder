import './App.css'
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Meal from './Components/Meal';
import MainPage from './Components/MainPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route path='/meal/:id' element={<Meal />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
