import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Use Navigate instead of Redirect
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import PostCrop from './Pages/PostCrop';
import Crop from './Pages/Crop';
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
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/crops" element={<Crop/>} />
        <Route path="/postCrop" element={
          <ProtectedRoute>
            <PostCrop />
          </ProtectedRoute>
        } /> {/* Updated */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

