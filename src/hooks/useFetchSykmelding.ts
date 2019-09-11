import { useState, useEffect } from "react";
import { Sykmelding_t } from "../types/sykmeldingTypes";


const useFetchSykmelding = ( url: string ) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect( () => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResponse( () => {
                    if (json.hasOwnProperty('begrunnelse')) {
                        return (
                            { 
                                begrunnelse: json.begrunnelse,
                                sykmelding: new Sykmelding_t(json.sykmelding)
                            }
                        )
                    } else {
                        throw new Error('JSON mangler begrunnelse');
                    }
                })
                setIsLoading(false);
            }
            catch(error) {
                setError(error);
            };
        }
        fetchData();
    }, []);
    return( { response, error, isLoading } );
}

/*
const [jsonRes, setJsonRes] = useState({ begrunnelse: '', sykmelding: {} });
const [begrunnelse, setBegrunnelse] = useState('');
const [sykmelding, setSykmelding] = useState({});

useEffect( () => {
    fetch(url)
    .then( response => response.json() )
    .then( json => setJsonRes( { begrunnelse: json.begrunnelse, sykmelding: json.sykmelding } ) )
    .catch( error => console.error(error));
}, []);
useEffect( () => setBegrunnelse(jsonRes.begrunnelse), [jsonRes]);
useEffect( () => setSykmelding(new Sykmelding_t(jsonRes.sykmelding)), [begrunnelse]);

return( { begrunnelse, sykmelding } )
*/

export default useFetchSykmelding;