/// <reference types="Cypress" />
import {allGalleriesPage} from '../page_objects/allGalleries'

describe('all galleries page test', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('contains', 'gallery-app');
    })

    it('test pagination', () => {
        allGalleriesPage.singleGallery.should('have.length', 10)
        allGalleriesPage.loadMoreBtn.click()
        allGalleriesPage.singleGallery.should('have.length', 20)
        // allGalleriesPage.allGalleries.children().should('have.length', 10);
        allGalleriesPage.allGalleries.children().first().should('have.class', 'cell');
        // allGalleriesPage.loadMoreBtn.click();
        // allGalleriesPage.allGalleries.children().should('have.length', 20);
    })    

    it('test search', ()=>{
        allGalleriesPage.search('nesto');
        allGalleriesPage.singleGallery.should('have.length',4)
        allGalleriesPage.allGalleriesHeading.should('be.visible')
        allGalleriesPage.searchField.should('be.visible')
        allGalleriesPage.loadMoreBtn.click()
        
    })
    
    it('test does first gallery have title', ()=>{
        allGalleriesPage.galleryTitle.should('be.visible')
    })

    it('test does all galleries have title', ()=>{
        allGalleriesPage.allGalleryTitle.should('be.visible')
    })

})
