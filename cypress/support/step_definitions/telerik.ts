/// <reference types='Cypress' />
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';
import { numberToUSDFormat } from '../../utils/currency';

Given('the user has logged into Telerik application', () => {
    cy.visit('https://demos.telerik.com/aspnet-mvc/admin-dashboard/Account/Login');
    cy.get('#Email').clear().type('jaxons.danniels@company.com');
    cy.get('#Password').clear().type('User*123');
    cy.contains('button', 'Sign In').click();
});

Then('the user visualizes All Employees table data correctly', () => {
    cy.request({
        method: 'POST',
        url: 'https://demos.telerik.com/aspnet-mvc/admin-dashboard/Home/Read',
        headers: {
            "accept": "*/*",
            "accept-language": "en,es-419;q=0.9,es;q=0.8,fr;q=0.7",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "sec-ch-ua": "\"Chromium\";v=\"106\", \"Google Chrome\";v=\"106\", \"Not;A=Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Linux\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest"
        },
        body: 'sort=&page=1&pageSize=7&group=&filter=&team=-1',
    }).then((response: any) => {
        const expectedData = response.body.Data;

        cy.get('tr.k-master-row').each((row, rowIndex) => {
            cy.wrap(row).find('td').then((cols) => {
                // Verify Contact column
                expect(cols[1].innerText).to.contain(expectedData[rowIndex].FullName);
                // Verify Job Title column
                expect(cols[2].innerText).to.contain(expectedData[rowIndex].JobTitle);
                // Verify Rating column
                cy.wrap(cols[3]).find('*[role="slider"]')
                    .should('have.attr', 'aria-valuenow', expectedData[rowIndex].Rating + '.0');
                // Verify Budget column
                expect(cols[4].innerText).to.equal(numberToUSDFormat(expectedData[rowIndex].Budget));
            });
        });
    });


    /*
    cy.request({
        method: 'POST',
        url: 'https://demos.telerik.com/aspnet-mvc/admin-dashboard/Home/Read', // baseUrl is prepend to URL
        headers: {
            'accept-language': 'en,es-419;q=0.9,es;q=0.8,fr;q=0.7',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'sec-ch-ua': '\'Chromium\';v=\'106\', \'Google Chrome\';v=\'106\', \'Not;A=Brand\';v=\'99\'',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '\'Linux\'',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'x-requested-with': 'XMLHttpRequest'
        },
        body: 'sort=&page=1&pageSize=7&group=&filter=&team=-1',
    }).then((response: any) => {
        const expectedData = response.body.Data;

        cy.get('tr.k-master-row').each((row, rowIndex) => {
            cy.wrap(row).find('td').then((cols: any) => {
                // Verify Contact column
                expect(cols[1].innerText).to.contain(expectedData[rowIndex].FullName);
                // Verify Job Title column
                expect(cols[2].innerText).to.contain(expectedData[rowIndex].JobTitle);
                // Verify Rating column
                cy.wrap(cols[3]).find('*[role='slider']').should('have.attr', 'aria-valuenow', expectedData[rowIndex].Rating + '.0');
                // Verify Budget column
                expect(cols[4].innerText).to.equal(numberToUSDFormat(expectedData[rowIndex].Budget));
            });
        });
    });
    */
});
