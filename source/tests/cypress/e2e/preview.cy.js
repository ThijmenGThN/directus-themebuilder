describe('Preview', () => {
  it('Screenshots', () => {
    cy.visit('http://localhost:3000')
    cy.wait(1000)
    cy.screenshot('Preview')
  })
})