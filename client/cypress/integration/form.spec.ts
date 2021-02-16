/// <reference types="cypress" />

describe('Form', () => {
  beforeEach(() => {
    cy.intercept('GET', '/backend/api/v1/manuellOppgave/123456', {
      fixture: 'oppgave.json',
    }).as('getOppgave');

    cy.intercept('GET', '/modiacontextholder/api/context/aktivenhet', {
      body: { aktivBruker: null, aktivEnhet: '0314' },
    });

    cy.intercept('GET', '/modiacontextholder/api/decorator', {
      body: {
        ident: 'Z123456',
        navn: 'F_Z123456 E_Z123456',
        fornavn: 'F_Z123456',
        etternavn: 'E_Z123456',
        enheter: [
          { enhetId: '0314', navn: 'NAV Sagene' },
          { enhetId: '0393', navn: 'NAV Oppfølging utland' },
        ],
      },
    });

    cy.intercept('POST', '/backend/api/v1/vurderingmanuelloppgave/123456', {
      statusCode: 200,
    }).as('postOppgave');
  });

  it('Manglende vurdering gir feil', () => {
    cy.visit('/?oppgaveid=123456'); // Baseurl comes from cypress.json
    cy.wait('@getOppgave');

    cy.get('#submit-button').click();

    cy.get('#feiloppsummering').contains('Oppgaven mangler vurdering');
  });

  describe('Godkjent tilbakedateringen (GODKJENT)', () => {
    it('Godkjent vurdering sender riktig JSON body', () => {
      cy.visit('/?oppgaveid=123456'); // Baseurl comes from cypress.json
      cy.wait('@getOppgave');

      const expectetBody = {
        status: 'GODKJENT',
      };

      cy.get('#b-status').click({ force: true });
      cy.get('#submit-button').click();

      cy.wait('@postOppgave').its('request.body').should('deep.equal', expectetBody);
    });
  });

  describe('Registrer med merknad (GODKJENT_MED_MERKNAD)', () => {
    it('UGYLDIG_TILBAKEDATERING sender riktig JSON body', () => {
      cy.visit('/?oppgaveid=123456'); // Baseurl comes from cypress.json
      cy.wait('@getOppgave');
      const expectetBody = {
        status: 'GODKJENT_MED_MERKNAD',
        merknad: 'UGYLDIG_TILBAKEDATERING',
      };
      cy.get('#b-status-godkjent-med-merknad').click({ force: true });
      cy.get('#b-merknad').click({ force: true });
      cy.get('#submit-button').click();

      cy.wait('@postOppgave').its('request.body').should('deep.equal', expectetBody);
    });

    it('TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER sender riktig JSON body', () => {
      cy.visit('/?oppgaveid=123456'); // Baseurl comes from cypress.json
      cy.wait('@getOppgave');
      const expectetBody = {
        status: 'GODKJENT_MED_MERKNAD',
        merknad: 'TILBAKEDATERING_KREVER_FLERE_OPPLYSNINGER',
      };
      cy.get('#b-status-godkjent-med-merknad').click({ force: true });
      cy.get('#b-merknad-tilbakedatering-krever-flere-opplysninger').click({ force: true });
      cy.get('#submit-button').click();

      cy.wait('@postOppgave').its('request.body').should('deep.equal', expectetBody);
    });

    it('Manglende valg av merknad gir feil', () => {
      cy.visit('/?oppgaveid=123456'); // Baseurl comes from cypress.json
      cy.wait('@getOppgave');

      cy.get('#b-status-godkjent-med-merknad').click({ force: true });
      cy.get('#submit-button').click();

      cy.get('#feiloppsummering').contains('Mangler merknad');
    });
  });

  describe('Avvis sykmeldingen (AVVIST)', () => {
    it('MANGLER_BEGRUNNELSE sender riktig JSON body', () => {
      cy.visit('/?oppgaveid=123456'); // Baseurl comes from cypress.json
      cy.wait('@getOppgave');
      const expectetBody = {
        status: 'AVVIST',
        avvisningType: 'MANGLER_BEGRUNNELSE',
      };

      cy.get('#b-status-avvist').click({ force: true });
      cy.get('#b-avvisningType').click({ force: true });
      cy.get('#submit-button').click();

      cy.wait('@postOppgave').its('request.body').should('deep.equal', expectetBody);
    });

    it('UGYLDIG_BEGRUNNELSE sender riktig JSON body', () => {
      cy.visit('/?oppgaveid=123456'); // Baseurl comes from cypress.json
      cy.wait('@getOppgave');
      const expectetBody = {
        status: 'AVVIST',
        avvisningType: 'UGYLDIG_BEGRUNNELSE',
      };

      cy.get('#b-status-avvist').click({ force: true });
      cy.get('#b-avvisningType-mangler-begrunnelse').click({ force: true });
      cy.get('#submit-button').click();

      cy.wait('@postOppgave').its('request.body').should('deep.equal', expectetBody);
    });

    it('Manglende valg av avvisningType gir feil', () => {
      cy.visit('/?oppgaveid=123456'); // Baseurl comes from cypress.json
      cy.wait('@getOppgave');

      cy.get('#b-status-avvist').click({ force: true });
      cy.get('#submit-button').click({ force: true });

      cy.get('#feiloppsummering').contains('Mangler avvisningstype');
    });
  });
});
