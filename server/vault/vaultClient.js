import fs from 'fs';

const setupVault = () => {  
  try {
    const CLIENT_ID = fs.readFileSync('/secrets/azuread/syfosmmanuell/client_id', 'utf8');
    const CLIENT_SECRET = fs.readFileSync('/secrets/azuread/syfosmmanuell/client_secret', 'utf8');
    const DOWNSTREAM_API_HOST = fs.readFileSync('/secrets/azuread/syfosmmanuell-backend/client_id', 'utf8');
    process.env['CLIENT_ID'] = CLIENT_ID;
    process.env['CLIENT_SECRET'] = CLIENT_SECRET;
    process.env['DOWNSTREAM_API_HOST'] = DOWNSTREAM_API_HOST;
  } catch (e) {
    console.log(e);
  }
};

export default setupVault;
