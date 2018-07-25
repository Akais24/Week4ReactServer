import React from 'react';
import './bootstrap.css';
import {Fade} from 'react-slideshow-image';
import img1 from './homeimg1.jpg';
import img2 from './homeimg2.jpg';
import img3 from './homeimg3.jpg';

const Home = () => {
  const images = [
    img1, img2, img3
  ];
    return (
      <div className="container custom_abcd" style={{
        display: "block",
        minHeight: "1px",
        width: "100%",
        overflow: "auto",
        textAlign: "center",
        background: "white"
    }}>
    <br /><h1>WELCOME TO MAD CAMP</h1><br />
        <Fade
          images = {images}
          duration={5000}
          transitionDuration={1000}
        />
        </div>
    );
};

export default Home;
