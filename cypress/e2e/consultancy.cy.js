describe('Formulário de consultoria', () => {

    it('Deve solicitar consultoria individual', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')
        cy.goTo('Formulários', 'Consultoria')

        cy.get('input[placeholder="Digite seu nome completo"]').type('Matheus Souza')

        cy.get('input[placeholder="Digite seu email"]').type('matheusrieper1@gmail.com')

        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('47 99635-5737')
            .should('have.value', '(47) 99635-5737')

        // tipo de consultoria
        cy.get('#consultancyType').select('In Company')

        // //span[text()="Pessoa Jurídica"]//..//input   em Xpatch

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .check()  // click() tambem funciona
            .should('be.checked')


        // tendo a certeza de que a outra opção nao irá ficar marcada.
        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')

        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('097.027.109-36')
            .should('have.value', '097.027.109-36')

        const discoveryChannels = [
            'Instagram',
            'LinkedIn',
            'Udemy',
            'YouTube',
            'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => {
            cy.contains('label', channel)
                .find('input')
                .check()  // click() tambem funciona
                .should('be.checked')
        })

        // elemento esta oculto.  colocando document and pdf
        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/foto.jpg', { force: true })

        // Interagindo com Area de texto
        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Aprendendo Cypress com NinjaDoCypres Webdojo Udemy')

        // adicionando habilidades em tecnologia
        const techs = [
            'Cypress',
            'selenium',
        ]
        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')
        })

        // marcando checkbox
        cy.contains('label', 'termos de uso')
            .find('input')
            .check()

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')
            .should('be.visible')

    })

    it.only('Deve verificar os campos obrigatórios', () => {
        cy.start()
        cy.submitLoginForm('papito@webdojo.com', 'katana123')

        cy.goTo('Formulários', 'Consultoria')

        cy.contains('button', 'Enviar formulário')
            .click()

        cy.contains('p', 'Campo obrigatório')
            .should('be.visible')

        cy.contains('p', 'Campo obrigatório')
            .should('be.visible')

        cy.contains('p', 'Você precisa aceitar os termos de uso')
            .should('be.visible')

    })
})