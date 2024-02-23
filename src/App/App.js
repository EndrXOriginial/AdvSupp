import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavComp from '../Components/navComp';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<NavComp />}>
          <Route path='products' element={<Products />} />
          <Route path='ingredients' element={<Ingredients />} />
          <Route path='potions' element={<Potions />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
