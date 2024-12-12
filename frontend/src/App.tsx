import React from 'react';
import NavBar from './components/layout/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutUs from './pages/AboutUs';
import UploadBook from './pages/UploadBook';
import LoginPage from './pages/LoginPage';
import SideBar from './components/layout/SideBar/SideBar';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute';
<<<<<<< HEAD
import BookDetails from './components/BookComponents/BookDetails';
=======
import EditProfile from './pages/EditProfile';
>>>>>>> cd4b8c65b40f0d24ed5e0534fa68d7237bfa8605

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
              <Route path='/login' element={<LoginPage />} />
              <Route path='/category/:categoryId' element={<HomePage />} />
              <Route path='/book/:id' element={<BookDetails/>} />

              {/* Rutas protegidas */}
              <Route path="/upload"element={ <ProtectedRoute element={<UploadBook /> } />}/>
              <Route path="/profile" element={ <ProtectedRoute element={<ProfilePage />} /> }/>
              <Route path="/edit-profile"element={ <ProtectedRoute element={<EditProfile /> } />}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </>
  );
};

export default App;
