describe("Forms tests", () => {
    beforeEach(() => {
        cy.visit('/forms')
    })

    it('Test subscribe form', () => {
        cy.contains(/testing forms/i)
        cy.getDataTest("subscribe-input").find('input').as('subscribe-inp')

        // best scenario
        cy.get('@subscribe-inp').type('alin00@gmail.com')
        cy.contains(/Successfully subbed: alin00@gmail.com/i).should('not.exist')
        cy.getDataTest("subscribe-button").click()
        cy.contains(/Successfully subbed: alin00@gmail.com/i).should('exist')
        cy.wait(3000)
        cy.contains(/Successfully subbed: alin00@gmail.com/i).should('not.exist')
        
        // wrong email
        cy.get('@subscribe-inp').type('alin00@gmail.io')
        cy.contains(/Invalid email: alin00@gmail.io!/i).should('not.exist')
        cy.getDataTest("subscribe-button").click()
        cy.contains(/Invalid email: alin00@gmail.io!/i).should('exist')
        cy.wait(3000)
        cy.contains(/Invalid email: alin00@gmail.io!/i).should('not.exist')
        
        cy.contains(/fail!/i).should('not.exist')
        cy.getDataTest("subscribe-button").click()
        cy.contains(/fail!/i).should('exist')
    })
})