// Copyright (C) 2020-2021 Intel Corporation
//
// SPDX-License-Identifier: MIT

/// <reference types="cypress" />

import { taskName } from '../../support/const';

context('Collapse sidebar/appearance', () => {
    const caseId = '30';
    let defaultValueLeftBackground;

    function checkEqualBackground() {
        cy.get('#cvat_canvas_background')
            .should('have.css', 'left')
            .and((currentValueLeftBackground) => {
                currentValueLeftBackground = Number(currentValueLeftBackground.match(/\d+/));
                expect(currentValueLeftBackground).to.be.eq(defaultValueLeftBackground);
            });
    }

    before(() => {
        cy.openTaskJob(taskName);

        // get default left value from background
        cy.get('#cvat_canvas_background')
            .should('have.css', 'left')
            .then((currentValueLeftBackground) => {
                defaultValueLeftBackground = Number(currentValueLeftBackground.match(/\d+/));
            });
    });

    describe(`Testing case "${caseId}"`, () => {
        it('Collapse sidebar', () => {
            // hide
            cy.get('.cvat-objects-sidebar-sider').click();
            cy.get('.cvat-objects-sidebar').should('not.be.visible');
            cy.get('#cvat_canvas_background')
                .should('have.css', 'left')
                .and((currentValueLeftBackground) => {
                    currentValueLeftBackground = Number(currentValueLeftBackground.match(/\d+/));
                    expect(currentValueLeftBackground).to.be.greaterThan(defaultValueLeftBackground);
                });

            // wait when background fitted
            cy.wait(500);

            // unhide
            cy.get('.cvat-objects-sidebar-sider').click();
            cy.get('.cvat-objects-sidebar').should('be.visible');
            checkEqualBackground();
        });

        it('Collapse appearance', () => {
            // hide
            cy.get('.cvat-objects-appearance-collapse-header').click();
            cy.get('.cvat-objects-appearance-content').should('not.be.visible');
            checkEqualBackground();

            // unhide
            cy.get('.cvat-objects-appearance-collapse-header').click();
            cy.get('.cvat-objects-appearance-content').should('be.visible');
            checkEqualBackground();
        });
    });
});
