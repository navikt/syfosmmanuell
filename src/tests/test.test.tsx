import { useState } from "react"
import { act } from '@testing-library/react-hooks';

const Comp = () => {
    const [state, setState] = useState({ property: "value" });
    return (
        <p>{state}</p>
    )
}

test('', () => {
    
})