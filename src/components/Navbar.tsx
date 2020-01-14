import React from 'react';
import { Knapp } from 'nav-frontend-knapper';

const Navbar = () => {
  return (
    <div
      className="navbar"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'white',
        marginBottom: '2rem',
        border: '1px solid grey',
      }}
    >
      <p>Logget inn som: Ola Norman</p>
      <Knapp style={{ margin: '1rem' }}>Logg ut</Knapp>
    </div>
  );
};

export default Navbar;
