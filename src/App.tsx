import * as React from 'react';
import Hello from './components/Hello';

const App = () => {
    return(
        <>
            <h1>Greeting text:</h1>
            <Hello name="typescript" enthusiasmLevel={3}/>
        </>
    )
}

export default App;