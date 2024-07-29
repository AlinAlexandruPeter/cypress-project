describe("Various exapmples", () => {
    beforeEach(() => {
        cy.visit("/examples")
    })
    it("Multi-page testing", () => {
        cy.getDataTest("nav-why").click()
        cy.location("pathname").should("equal", "/")
        
        cy.getDataTest("nav-overview").click()
        cy.location("pathname").should("equal", "/overview")
        
        cy.getDataTest("nav-fundamentals").click()
        cy.location("pathname").should("equal", "/fundamentals")
    })

    it('Interception', () => {
        cy.intercept("POST", 'http://localhost:3000/examples', {
            // body: {
            //     message: "Succesfully intercepted request"
            // }
            fixture: 'example.json'
        })
        cy.getDataTest("post-button").click()
    })

    it.only('Grudges', () => {              // study state changes
        cy.contains(/add some grudges/i).as("title-verification")
        cy.getDataTest("grudge-list").within(() => {
            cy.get("li").should("have.length", 0)
        })
        cy.getDataTest('new-grudge-input').within(() => {
            cy.get('input').type('some grudge')
        })
        cy.getDataTest("add-grudge-button").click()
        cy.getDataTest("grudge-list").within(() => {
            cy.get("li").should("have.length", 1)
        })
        
        cy.getDataTest('new-grudge-input').within(() => {
            cy.get('input').type('number 2')
        })
        cy.getDataTest("add-grudge-button").click()
        cy.getDataTest("grudge-list").within(() => {
            cy.get("li").should("have.length", 2)
            cy.get("li").its(0).should("contains.text", "some grudge")
        })

        cy.getDataTest("grudge-list").within(() => {
            cy.get("li").its(0).within(() => {
                cy.get("button").click()
            })
        })

        cy.getDataTest("grudge-list").within(() => {
            cy.get("li").should("have.length", 1)
        })

        cy.getDataTest("clear-list-button").click()
        cy.getDataTest("grudge-list").within(() => {
            cy.get("li").should("have.length", 0 )
        })
    })
})