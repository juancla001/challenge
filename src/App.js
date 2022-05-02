import './css/app.css'
import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login'
import List from './components/List'
import Detail from './components/Detail'
import Result from './components/Result'
import Header from './components/Header'
//import Footer from './components/Footer'

function App() {
  let addOrRemoveFavs = ()=> {
    console.log("ok funciona");
    
  }
  return (
    <>

      <Header />
      
      <div className='container mt-3'>
        <Routes>
          <Route exact path="/*" element={<Login />} />
          <Route exact path="/" element={<List render={(props) =>  addOrRemoveFavs={addOrRemoveFavs}} /> } />
          <Route path="/detail" element={<Detail />} />
          <Route path="/result" element={<Result />} />

        </Routes>

      </div>
    </>
  );
}

export default App;
