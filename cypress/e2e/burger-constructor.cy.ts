import type {} from '../support/cypress'
import type {} from 'cypress'

describe('Home page', () => {
  it('execute DnD the ingredients and place an order', function () {
    cy.prepare()

    cy.get('[data-testid="ingredient-bun"]').should('exist').as('dragBun')
    cy.get('[data-testid="ingredient-queue"]')
      .should('exist')
      .as('dragIngredient')
    cy.get('[data-testid="constructor-drop-area"]')
      .should('exist')
      .as('dropConstructor')

    cy.get('@dragBun').first().trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get('@dragIngredient').eq(2).trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get('[data-testid="constructor-bun-top"]').should(
      'contain',
      'Краторная булка N-200i (верх)',
    )
    cy.get('[data-testid="constructor-bun-bottom"]').should(
      'contain',
      'Краторная булка N-200i (низ)',
    )
    cy.get('[data-testid="ingredient-queue"]').should(
      'contain',
      'Биокотлета из марсианской Магнолии',
    )

    cy.get('[data-testid="constructor-place-an-order"]')
      .should('exist')
      .click()

    cy.get('[data-testid="order-number"]').contains('345345').should('exist')
  })

  it('execute open and close the modal with an ingredient', () => {
    cy.prepare()

    cy.get('[data-testid="ingredient-bun"]').should('exist').as('bun')

    cy.get('@bun').first().should('exist').click()
    cy.get('[data-testid="modal-close-button"]').should('exist').as('closeButton')
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c')
    cy.get('[data-testid="ingredient-details-name"]')
      .should('exist')
      .contains('Краторная булка N-200i')
    cy.get('@closeButton').should('exist').click()
    cy.get('@closeButton').should('not.exist')

    cy.get('@bun').first().should('exist').click()
    cy.get('@closeButton').should('exist')
    cy.get('[data-testid="modal-close-overlay"]')
      .should('exist')
      .click({ force: true })
    cy.get('@closeButton').should('not.exist')
  })

})
