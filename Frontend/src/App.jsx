import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Home from './pages/Home'
import { Navigate, Route,Routes, useLocation } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import MyResultPage from './pages/MyResultPage'



//private route
function RequireAuth({ children }){
 const isLoggedIn=Boolean(localStorage.getItem('authToken'));
 const location=useLocation();
 if(!isLoggedIn){
  return <Navigate to='/login' state={{from:location}} replace/>
 }
 else
  return children;
}


function App() {

  return (
   <Routes>
    <Route path="/" element={<Home/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
     <Route path='/result' element={
      <RequireAuth>
        <MyResultPage/>
      </RequireAuth>
     }></Route>
   
   </Routes>
  )
}

export default App
