import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; 
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PostCrop from './Pages/PostCrop';
import Crop from './Pages/Crop';
import Analysis from './Pages/Analysis';
import ContactFarmer from './Pages/contactFarmer'; // ✅ Corrected Import Name

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crops" element={<Crop />} />
        <Route path="/Analysis" element={<Analysis />} />
        <Route path="/postCrop" element={<ProtectedRoute><PostCrop /></ProtectedRoute>} />
        {/* ✅ Pass cropId in URL */}
        <Route path="/contactFarmer/:cropId" element={<ProtectedRoute><ContactFarmer /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
