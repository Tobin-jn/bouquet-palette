# Bouquet Picker

Bouquet Picker is a palette picker for a user to design a flower bouquet.

### About

A user can generate random colors on the flowers. Flower colrs can be saved by clicking on a flower. Projects can be saved and inside a project, a user can save multiple palettes. A user can view their saved palettes for any specific project. By selecting a saved palette, they can view the colors on the flowers.

The server is built with Express.js, while the front end was build with jQuery. This project has a PostgreSQL database for storing project and palette information.

### See it Live

[Bouquet Picker](https://perfect-palette.herokuapp.com/) on Heroku.

### Tech Stack

* jQuery
* Express.js
* Knex.js
* PostgreSQL

## Screenshots

#### Bouquet Picker:

<img src='images/bouquet-picker.png' alt='Wireframe' width='800' >

#### Wireframe:

<img src='images/palette-picker-wireframe.png' alt='Wireframe' width='450' >

## API Endpoints

#### GET all Projects

```/api/v1/projects```

#### POST a new project

```/api/v1/projects```

All new projects require a name parameter.

#### GET a specific project

```/api/v1/projects/:id```

#### POST a new palette

```/api/v1/projects/:project_id/palettes```

All new palettes require the following parameters: name, hex1, hex2, hex3, hex4, hex5, and project_id

#### GET palettes of a specific project

```/api/v1/projects/:project_id/palettes```

#### DELETE a palette

```/api/v1/projects/:project_id/palettes/:palette_id```

## Setup

Clone the repo

Run ```npm install``` from the root directory

Run ```npm start``` and visit localhost:3000 in your browser

### Test Driven Development

Bouquet Picker uses Mocha and Chai for testing.

Run with ```npm test``` from the root directory

### Original Assignment

[Palette Picker](http://frontend.turing.io/projects/palette-picker.html) from the [Turing School of Software & Design](https://turing.io/)

### Contributors

* Tobin Nelson: [Github Profile](https://github.com/Tobin-jn)
