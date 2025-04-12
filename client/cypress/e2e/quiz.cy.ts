describe('Quiz App', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3001'); // make sure your client is running
    });
  
    it('should load the start button', () => {
      cy.contains('Start Quiz').should('exist');
    });
  
    it('should start the quiz and load first question', () => {
      cy.contains('Start Quiz').click();
      cy.get('[data-testid="question"]').should('exist');
      cy.get('[data-testid="answer"]').should('have.length.at.least', 1);
    });
  
    it('should allow answering questions', () => {
      cy.contains('Start Quiz').click();
      cy.get('[data-testid="answer"]').first().click();
    });
  });
  