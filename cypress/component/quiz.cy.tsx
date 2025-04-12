import React from 'react';
import { mount } from 'cypress/react';
import Quiz from '@components/Quiz';

describe('Quiz Component', () => {
  it('renders with Start button', () => {
    mount(<Quiz />);
    cy.contains('Start').should('exist');
  });
});
