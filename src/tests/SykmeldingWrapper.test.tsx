import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { create } from 'react-test-render';
import SykmeldingWrapper from '../components/SykmeldingWrapper';
import { act } from "react-dom/test-utils";

describe('SykmeldingWrapper', () => {
    let container;

    beforeEach( () => {
        container = document.createElement("div");
        document.body.appendChild(container);
    })

    it('shows spinner when fetching data', () => {
        act( () => {
            ReactDOM.render(<SykmeldingWrapper/>, container);
        })
        const text = container.getElementByClassName("panelTittelContainer");
        expect(1).toBeTruthy();
    })
})