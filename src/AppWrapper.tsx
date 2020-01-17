import React, { useState } from 'react';
import Navbar from './components/Navbar';
import App from './components/App';

const AppWrapper = () => {
  const [visInnhold, setVisInnhold] = useState<boolean>(true);

  return (
    <>
      <Navbar visInnhold={setVisInnhold} />
      {visInnhold && (
        <span style={{ display: 'flex', justifyContent: 'center' }}>
          <App />
        </span>
      )}
    </>
  );
};

export default AppWrapper;
