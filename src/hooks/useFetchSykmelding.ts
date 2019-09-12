import { useState, useEffect } from "react";
import { Sykmelding } from "../types/sykmeldingTypes";

const useFetchSykmelding = ( url: string ) => {
    const [begrunnelse, setBegrunnelse] = useState<string | null>(null);
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect( () => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(url);
                const json = await res.json();
                if (json.hasOwnProperty('begrunnelse')) {
                    setBegrunnelse(json.begrunnelse);
                    setSykmelding(new Sykmelding(json.sykmelding));
                    setIsLoading(false);
                } else {
                    throw new Error('Sykmelding mangler begrunnelse');
                }
            }
            catch(error) {
                setError(error);
            };
        }
        fetchData();
    }, []);
    return( { begrunnelse, sykmelding, error, isLoading } );
}

export default useFetchSykmelding;