import { createYield } from "typescript";

describe('emails-input', () => {
  it('should accept a new email and tag it as valid', () => {
      const email = "valid@miro.com";
      cy.visit('/')
        .get('body')
        .findByPlaceholderText('add more people...')
        .click()
        .type(`${email},`)
      cy.findByText(email)
        .should('exist')
        .and('have.data', 'isValid', 'valid');
    });
  it('should accept a random string and tag it as invalid', () => {
      const block = "invalid.email";
      cy.visit('/')
        .get('body')
        .findByPlaceholderText('add more people...')
        .click()
        .type(`${block},`)
      cy.findByText(block)
        .should('exist')
        .and('have.data', 'isValid', 'invalid');
    });
  it('should parse pasted string into blocks', () => {
      const block1 = "valid@miro.com";
      const block2 = "invalid.email";
      const block3 = "valid@miro.com";
      const csv = [block1, block2, block3].join(',');
      cy.visit('/')
        .get('body')
        .findByPlaceholderText('add more people...')
        .click()
        // simulating a paste event
        .invoke('val', csv).trigger('paste', {
          clipboardData: {
            getData: (text: string) => csv,
          }
        })
      cy.findAllByText(block1)
        .should('exist')
        .and('have.data', 'isValid', 'valid');
      cy.findByText(block2)
        .should('exist')
        .and('have.data', 'isValid', 'invalid');
    });
  it('should delete a block when X is clicked', () => {
    const email = "valid@miro.com";
      cy.visit(`/?emails=${email}`)
        .get('body')
        .findByRole('button')
        .click()
        cy.findByText(email)
        .should('not.exist');
    });
});