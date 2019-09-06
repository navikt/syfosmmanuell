import * as React from 'react';
import Hello from './components/Hello';
import Tekstomrade from 'nav-frontend-tekstomrade';
import NavFrontendSpinner from 'nav-frontend-spinner';


const App = () => {
    return(
        <>
            <h1>Greeting text:</h1>
            <Hello name="typescript" enthusiasmLevel={3}/>
            <NavFrontendSpinner />
            <Tekstomrade>New text</Tekstomrade>
        </>
    )
}

export default App;