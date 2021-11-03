//NB: il faut préalablement lancer lite-server dans le répertoire
//comportant index.html pour démarrer lite-server dont l'URL
//est http://localhost:3000 par defaut

describe('My HTML/JS Tests', () => {
  it('good addition in calculatriceV3.html', () => {
    
	//partir de index.html
	cy.visit("http://localhost:3000/index.html")
	
	//cliquer sur le lien comportant 'calculatriceV3'
	cy.contains('calculatriceV3').click()
	cy.wait(50)
	// Should be on a new URL which includes '/calculatrice'
    cy.url().should('include', '/calculatrice')
	
	// Get an input, type data into it 
	//and verify that the value has been updated
    cy.get('#a')
      .type('5')
      .should('have.value', '5')
	  
	cy.get('#b')
      .type('6')
      .should('have.value', '6')
	  
	//declencher click sur bouton addition
	cy.get('#btn_op_addition')
      .click()
	
	//vérifier que la zone d'id spanRes comporte le texte '11'
	cy.get('#spanRes')
      .should('have.text', '11')
  })
  
  it('good multiplication in calculatriceV3.html', () => {
    
	//visiter calculatriceV3.html
	cy.visit("http://localhost:3000/calculatriceV3.html")
	
    cy.get('#a').type('3').should('have.value', '3')
	  
	cy.get('#b').type('4').should('have.value', '4')
	  
	//declencher click sur bouton multiplication
	//cy.get('#btn_op_multiplication').click()
	cy.get('#btn_op_multiplication').trigger("click")
	
	//vérifier que la zone d'id spanRes comporte le texte '12'
	cy.get('#spanRes')
      .should('have.text', '12')
  })
  
  it('Historique cache ou bien affiche', () => {
	//visiter calculatriceV3.html
	cy.visit("http://localhost:3000/calculatriceV3.html")
	
	cy.get('#a').type('2')
	cy.get('#b').type('3')
	cy.get('#btn_op_addition').click()
	cy.get('#spanRes').should('have.text', '5')
	
	cy.get("#cbHisto").check()
	cy.get("#ulHistorique").should('be.visible')//ok meme si display:block
		
	cy.get("#cbHisto").uncheck()
	cy.get("#ulHistorique").should('be.hidden')//ok meme si display:none
  })
})
