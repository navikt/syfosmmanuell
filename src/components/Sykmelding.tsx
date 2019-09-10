import * as React from 'react';
import { Tilbakedatert_t } from '../types/Sykmelding';
import { TILBAKEDATERT_MED_BEGRUNNELSE } from '../types/begrunnelser';


const Sykmelding = () => {
    const [state, setState] = React.useState( { begrunnelse: '', sykmeld: {} } )
    const [tilbake, setTilbake] = React.useState( {} );

    React.useEffect( () => {
        fetch('src/moch/test.json')
        .then( response => response.json())
        .then( json => {
            console.log('received json: ' + JSON.stringify(json) );
            setState({ begrunnelse: json.begrunnelse, sykmeld: json.sykmelding });
        })
        .catch( error => { console.error('could not fetch data ' + error) })
    }, [])

    React.useEffect( () => {
        switch(state.begrunnelse) {
            case TILBAKEDATERT_MED_BEGRUNNELSE: {
                setTilbake( new Tilbakedatert_t(state.sykmeld) );
                break;
            }
        }
    }, [state])

    return(
        <>
        <p>{state.begrunnelse}</p>
        <p>{JSON.stringify(state.sykmeld)}</p>
        </>
    )
}


export default Sykmelding;