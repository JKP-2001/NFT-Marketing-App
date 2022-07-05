import React,{useState,useEffect} from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import homeImage from "../../assets/home-img.png";
import Item from "./Item";
import Minter from "./Minter";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate
} from "react-router-dom";
import Gallery from "./Gallery";
import Discover from "./Discover";


const App = () =>{

  
   
  const id = "rrkah-fqaaa-aaaaa-aaaaq-cai";
  return (
    <div className="App">
      
      <Router forceRefresh={true}>
        <Header />
        <Routes>
          <Route exact path = "/" element={<img className="bottom-space" src={homeImage} />} />
          <Route exact path="/discover" element={<Discover/>} />
          <Route exact path="/mint" element={<Minter />} />
          <Route exact path="/gallery" element={<Gallery/>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
