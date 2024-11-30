import React from 'react';
import NavBar from './components/layout/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import AboutUs from './components/AboutUs/AboutUs';
import UploadBook from './components/UploadBook/UploadBook';
import LoginPage from './components/LoginPage/LoginPage';
import SideBar from './components/layout/SideBar/SideBar';
import ProfilePage from './components/ProfilePage/ProfilePage';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className='flex min-h-screen'>
          <SideBar />
          <div className='flex-1 p4'>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/about' element={<AboutUs />} />
              <Route path='/upload' element={<UploadBook />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/category/:categoryId' element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};






export default App;
