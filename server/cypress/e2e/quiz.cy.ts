describe('Tech Quiz App', () => {
    it('should complete the quiz and show score', () => {
      cy.visit('/');
      cy.contains('Start').click();
  
      for (let i = 0; i < 10; i++) {
        cy.get('[data-testid="question"]').should('exist');
        cy.get('[data-testid="answer"]').first().click();
      }
  
      cy.contains('Your Score').should('exist');
      cy.contains('Start Over').click();
      cy.contains('Start').should('exist');
    });
  });
  