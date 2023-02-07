
describe('Accessible', () => {
  it('OK', () => {
    cy.visit('http://localhost:3000')
  })
})

describe('Theme Builder', () => {
  beforeEach('OK', () => {
    cy.visit('http://localhost:3000')
  })

  it('Color Picker', () => {
    cy.get('#color-picker').click()
  })
})
