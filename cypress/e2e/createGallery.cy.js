/// <reference types="Cypress" />
import {createGallery} from '../page_objects/createGallery';
const faker = require('@faker-js/faker')

describe('create galery', ()=>{
    let email = 'bla@gmail.com';
    let password = '12345678';
    let title = faker.random.alpha({ count:5})
    let invalidTitle = faker.random.alpha({ count:1})
    let invalidTitle2 = faker.random.alpha({ count:256})
    let invalidDescription = faker.random.alpha({ count:1001})
    let description = 'test';
    let image = 'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036__340.jpg'
    let wrongUrl = 'https://cdn.pixabay.com/photo/2019/07/30/05/53/dog-4372036__340.txt'


    beforeEach('valid login using POM', () =>{
        cy.visit('/'),
        createGallery.loginBtn.click()
        createGallery.login(email, password)
        cy.url().should('not.include', '/login')

    })
   

    it('create gallery', () =>{
        createGallery.createGalleryBtn.click()
        createGallery.createTitle.should('have.text', 'Create Gallery')
        createGallery.createGallery(title, description, image)
        cy.url().should('not.include', '/create')
        
    })


    it('create gallery without title', () =>{
         cy.visit('/create')
         createGallery.createGalleryBtn.click()
         createGallery.withoutTitle(description, image)
         cy.url().should('include', '/create')
         createGallery.createTitle.should('have.text', 'Create Gallery')

         
    })

    it('create gallery with one char in title', () =>{
       createGallery.titleWithOneCharacter(invalidTitle,description, image)
          cy.url().should('include', '/create')
          createGallery.errorMessage.should('be.visible')
         .and('have.text', 'The title must be at least 2 characters.')
         .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    })
    
    it('create gallery with 256 char in title', () =>{
        createGallery.titleWith256Character(invalidTitle2,description, image)
          cy.url().should('include', '/create')
          createGallery.errorMessage.should('be.visible')
         .and('have.text', 'The title may not be greater than 255 characters.')
         .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    })

    it('create gallery without description', () =>{
        createGallery.galleryWithoutDescription(title,image)
         cy.url().should('include', '/create')
         createGallery.createTitle.should('have.text', 'Create Gallery')
    })       

    it('create gallery with invalid description', () =>{
        createGallery.descriptionWith1001Char(title,invalidDescription,image)
            cy.url().should('include', '/create')
            createGallery.errorMessage.should('be.visible')
            .and('have.text', 'The description may not be greater than 1000 characters.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    })    

    it('create gallery with wrong url format', () =>{
        createGallery.createWithWrongUrl(title,description, wrongUrl);
            cy.url().should('include', '/create');
            createGallery.errorMessage.should('be.visible')
            .and('have.text', 'Wrong format of image')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
    })
    
    it('all empty fields', () =>{
        createGallery.allEmptyFields();
        cy.url().should('include', '/create');
        createGallery.createTitle.should('have.text', 'Create Gallery')
    })

    it.only('create gallery with two images', () =>{
        createGallery.galleryWithTwoImages(title,description,image);
        cy.url().should('not.include', '/create');
        createGallery.allGalleriesTitle.should('have.text', 'All Galleries')
    })
    
    
    })
