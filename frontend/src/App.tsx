import React from 'react';
import NavBar from './components/layout/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AboutUs from './components/AboutUs/AboutUs';
import UploadBook from './components/UploadBook/UploadBook';
import LoginPage from './components/LoginPage/LoginPage';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/upload' element={<UploadBook />} />
          <Route path='/login' element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};





/*const App: React.FC = () => {
  return (
    <div className="bg-blue-500 text-white p-4 text-center rounded">
      <h1 className="text-2xl font-bold">¡TailwindCSS está funcionando!</h1>
      <p className="text-lg">Prueba aplicando clases de Tailwind aquí.</p>
    </div>
  );
};*/

export default App;
