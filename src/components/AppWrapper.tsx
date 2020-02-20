import React, { useState } from 'react';
import Navbar from './Navbar';
import App from './App';

const AppWrapper = () => {
  return (
    <>
      <Navbar />
      <span style={{ display: 'flex', justifyContent: 'center' }}>
        <App />
      </span>
    </>
  );
};

export default AppWrapper;
