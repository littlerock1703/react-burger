import type {} from '../support/cypress'
import type {} from 'cypress'

const SELECTORS = {
  queue: '[data-testid="ingredient-queue"]',
  bun: '[data-testid="ingredient-bun"]',
  bun_top: '[data-testid="constructor-bun-top"]',
  bun_bottom: '[data-testid="constructor-bun-bottom"]',
  modal_close_overlay: '[data-testid="modal-close-overlay"]',
  modal_close: '[data-testid="modal-close-button"]',
  drop_area: '[data-testid="constructor-drop-area"]',
  place_an_order: '[data-testid="constructor-place-an-order"]',
  ingredient_name: '[data-testid="ingredient-details-name"]'
} as const

describe('Home page', () => {
  it('execute DnD the ingredients and place an order', function () {
    cy.prepare()

    cy.get(SELECTORS.bun).should('exist').as('dragBun')
    cy.get(SELECTORS.queue)
      .should('exist')
      .as('dragIngredient')
    cy.get(SELECTORS.drop_area)
      .should('exist')
      .as('dropConstructor')

    cy.get('@dragBun').first().trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get('@dragIngredient').eq(2).trigger('dragstart')
    cy.get('@dropConstructor').trigger('dragenter').trigger('drop')

    cy.get(SELECTORS.bun_top).should(
      'contain',
      'Краторная булка N-200i (верх)',
    )
    cy.get(SELECTORS.bun_bottom).should(
      'contain',
      'Краторная булка N-200i (низ)',
    )
    cy.get(SELECTORS.queue).should(
      'contain',
      'Биокотлета из марсианской Магнолии',
    )

    cy.get(SELECTORS.place_an_order)
      .should('exist')
      .click()

    cy.get('[data-testid="order-number"]').contains('345345').should('exist')
  })

  it('execute open and close the modal with an ingredient', () => {
    cy.prepare()

    cy.get(SELECTORS.bun).should('exist').as('bun')

    cy.get('@bun').first().should('exist').click()
    cy.get(SELECTORS.modal_close).should('exist').as('closebutton_first')
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c')
    cy.get(SELECTORS.ingredient_name)
      .should('exist')
      .contains('Краторная булка N-200i')
    cy.get('@closebutton_first').should('exist').click()
    cy.get('@closebutton_first').should('not.exist')

    cy.get('@bun').first().should('exist').click()
    cy.get(SELECTORS.modal_close).should('exist').as('closebutton_second')
    cy.get(SELECTORS.modal_close_overlay)
      .should('exist')
      .click({ force: true })
    cy.get('@closebutton_second').should('not.exist')
  })

})
