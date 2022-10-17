import './App.css';
import 'antd/dist/antd.min.css';
// import { Button } from 'antd';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Home from './pages/Home';
import Test from './pages/Test';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path="/test" element={<ProtectedRoute><Test/></ProtectedRoute>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


function ProtectedRoute(props){
  if(localStorage.getItem('income-expense-manager-user')){
    return props.children;
  }
  else{
    return <Navigate to='/login' />
  }
}

export default App;
