# flash-cards-game
A web application that allows users to play and/or craete a flash cards game.

This application allows you to:
-   Register
2. LogIn/LogOut
3. Choose the category of the Decks that you want to be shown on the Dashboard
4. Pick a Deck to see its information 
5. Start playing with the Deck
6. Move to the next/previous card of the the Deck you are playing with
7. "Star" a card that you find interesting during the game so that you can come back later or when you finish the game

If you are logged in, you can also:
-  Create a new Deck
2. See all the decks that you own
3. Delete a Deck that you own
4. Create cards for any Deck that you own
5. See a list of all the cards of a deck that you own
6. Delete a card of a deck that you own 

# Installation

# BEFORE YOU INSTALL:
For the frontend:

Make sure that you have installed a node version 7.x.
Also make sure that you have installed the latest version of angular cli.

Once you have cloned the app move to the frontend director:

`npm install ng2-bootstrap bootstrap –save`

For the backend:

Make sure that you have installed python 3.
Install Django:
`pip3 install Django`

Install django REST framework:
`pip3 install djangorestframework`

Install Django Rest framework JWT Auth:
`pip3 install djangorestframework-jwt`

# Backend

The backend of the project was generated with django and django REST framework.
Since you have cloned the project navigate to the backend dir.
`cd fcga`
`cd backend`
Navigate to the flip_cards_game dir and make the appropriate changes to the site_config.py file.

The uploaded example uses mySQL. For the creation of the database create a query and execute the above lines of code with the appropriate changes:

`CREATE DATABASE flipcard CHARACTER SET utf8 COLLATE utf8_general_ci;`

`CREATE USER 'flip_user'@'localhost' IDENTIFIED BY 'g8nzmktk6y';`

`GRANT ALL PRIVILEGES ON flipcard.* TO 'flip_user'@'localhost';`

Then, navigate to the fcga/backend director and use the migrate command:
`python3 manage.py makemigrations`
`python3 manage.py migrate`


Navigate to the fcga/backend/flipcards director and create a folder named "static". 

# Fronend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.0.

Navigate to the fcga/frontend director:
`npm istall`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


Once you have built the project copy all the files of the “dist” director and paste them in the static folder of the backend.


# Run the project
Navigate to the fcga/backend director and run:
`python3 manage.py runserver`

To play you need to sign up, log in and create a deck. Once you have created the deck you will be navigated automatically to the "my decks" section of the application. 

Choose the deck that you have created and then a section will appear where you can add cards. Navigate to the "view details section" where you will find iformation about the deck. You can start playing. 
