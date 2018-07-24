import React from 'react';
import './bootstrap.css';
import img from './mainimg.jpg';

const Home = () => {
    return (
      <div className='container'>
        <img src={img} alt="" width="100%" />
      </div>
    );
};

export default Home;
