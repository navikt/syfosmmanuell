import { useState, useEffect } from "react";
import { Sykmelding } from "../types/SykmeldingTypes";
import { ValidationResult } from '../types/ValidationResultTypes';

const useFetchSykmelding = () => {
    const [begrunnelser, setBegrunnelser] = useState<ValidationResult | null>(null);
    const [sykmelding, setSykmelding] = useState<Sykmelding | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);

    useEffect( () => {
        setIsLoading(true);
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                if (json.validationResult) {
                    setBegrunnelser(new ValidationResult(json.validationResult));
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
    }, [url]);

    return( { begrunnelser, sykmelding, error, isLoading, callFetch: setUrl } );
}

export default useFetchSykmelding;