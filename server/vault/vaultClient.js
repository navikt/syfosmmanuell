import fs from 'fs';

const setupVault = () => {
  const CLIENT_ID = fs.readFileSync('/secrets/azuread/syfosmmanuell/client_id');
  const CLIENT_SECRET = fs.readFileSync('/secrets/azuread/syfosmmanuell/client_secret');
  const BACKEND_CLIENT_ID = fs.readFileSync('/secrets/azuread/syfosmmanuell-backend/client_id');
  console.log(CLIENT_ID);
  console.log(CLIENT_SECRET);
  console.log(BACKEND_CLIENT_ID);
  
  try {
    process.env['CLIENT_ID'] = CLIENT_ID;
    process.env['CLIENT_SECRET'] = CLIENT_SECRET;
    process.env['DOWNSTREAM_API_CLIENT_ID'] = BACKEND_CLIENT_ID;
  } catch (e) {
    console.log(e);
  }
};

export default setupVault;
