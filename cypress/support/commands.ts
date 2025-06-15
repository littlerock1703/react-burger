import { endpoints } from '../../src/utils/api'

const refreshToken = JSON.stringify('cy-refresh-token')
const accessToken = JSON.stringify('cy-access-token')

Cypress.Commands.add('prepare', () => {
  cy.intercept('POST', endpoints.orders, { fixture: 'example_order' }).as('postOrder')
  cy.intercept('GET', endpoints.user, { fixture: 'example_user' })
  cy.intercept('GET', endpoints.ingredients, { fixture: 'example_ingredients' })

  cy.visit('http://localhost:5173/')

  window.localStorage.setItem('accessToken', accessToken)
  window.localStorage.setItem('refreshToken', refreshToken)
})
