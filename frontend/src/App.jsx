import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import './index.css';
import Auth from './pages/Auth';
import { Toaster } from 'react-hot-toast'


function App() {
  return (
    <>
      <Toaster position="top-center" />


      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          {/* <Route path="/l" element={<Login />} /> */}
          {/* <Route path="/register" element={<Register />} /> */}
          {/* Add other routes here...... */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
