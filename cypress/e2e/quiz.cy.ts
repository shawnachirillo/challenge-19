describe('Tech Quiz App', () => {
  it('should complete the quiz and show score', () => {
    cy.visit('/');
    cy.contains('Start').click();

    for (let i = 0; i < 10; i++) {
      cy.get('body').then(($body) => {
        if ($body.find('[data-testid="question"]').length > 0) {
          cy.get('[data-testid="question"]').should('exist');
          cy.get('[data-testid="answer"]').first().click();
        }
      });
    }

    cy.contains('Your score').should('exist');
    cy.contains('Take New Quiz').click();
    cy.contains('Start Quiz').should('exist');
  });
});
