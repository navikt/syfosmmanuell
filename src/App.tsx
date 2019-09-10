import * as React from 'react';
import Tekstomrade from 'nav-frontend-tekstomrade';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Sykmelding from './components/Sykmelding';

const App = () => {
    return(
        <>
            <h1>Greeting text:</h1>
            <Sykmelding/>
            <NavFrontendSpinner />
            <Tekstomrade>New text</Tekstomrade>
        </>
    )
}

export default App;