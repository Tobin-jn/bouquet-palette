const express = require('express');
//express is a lightweight javascript framework built atop node.js
const bodyParser = require('body-parser');
//a middleware that parses the incoming request body before it hits these handlers
const app = express();
//app is an instance of express and comes with access to all the express methods and properties
const environment = process.env.NODE_ENV || 'development';
//defines the environment and defaults to developement
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
//referwnce to the knex database

app.use( bodyParser.json() );
//use the bodyParser for any json data coming into our handlers
app.use(express.static('public'));
//static is a method that looks into a folder and serves up the static files, in this case it is serving the html file in public

app.set('port', process.env.PORT || 3000);
//set is a method that is declaring what port. It says use the process.env.PORT specifically if it exists in whatever environemnt the code is running in, otherwise, port 3000
app.locals.title = 'Palettes';
//app.locals here is a variable only available here, it is defining a title that is shown in the terminal when the server is running

//get all projects
app.get('/api/v1/projects', (request, response) => {
//a get request to this URL
  database('projects').select()
  //selects the projects table in the knex database, returns a promise
    .then((projects) => {
      response.status(200).json(projects)
    })
  //creates a response object, adds a status code to the response and parses the json data and includes the data in the response. Returns a promise
    .catch((error) => {
      response.status(500).json({ error: error.message })
    });
  //creates a response object for an error
});

//post new project
app.post('/api/v1/projects', (request, response) => {
//a post request to this URL
  const project = request.body
  //assigning project to be the body of the response, which would be the project we want to post

  for (let requiredParameter of ['name']) {
  //the app is required to include a project name as a key in this object
    if (!project[requiredParameter]) {
      return response.status(422).send({ error: 'Missing a Project Name' });
    }
  //checking to see if proper parameters are included, if not we are creating the response object
  }

  database('projects').insert(project, 'id')
  //go to the projects table in the database and insert the project we are sending, add an id to the project. Knex tells the id to increment
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
  //creates a response object, adds a status code to the response and parses the json data and includes the data in the response. Returns a promise.

  //***I'm a little unsure of the id: project[0] syntax and what is happening. going to the first index of the project...
  
    .catch(error => {
      response.status(500).json({ error: error.message })
    });
    //creates a response object for an error
});

//get specific project- 
app.get('/api/v1/projects/:id', (request, response) => {
//a get request to this URL
  const { id } = request.params;
//using the params property to access the request url and insert dynamic data, in this case the id

  database('projects').where('id', id).select()
  //go to the database called projects, use the where method to query the database. Look for the id record with a value of the id in the url. select this record to return in the response, returns a promise
    .then(project => response.status(200).json(project))
    //creates a response object, adds a status code to the response and parses the json data and includes the data in the response. Returns a promise
    .catch(error => console.log(`Error fetching project: ${error.message}`))
    //creates a response object for an error
});

//get palettes of a specific project
app.get('/api/v1/projects/:project_id/palettes', (request, response) => {
//a get request to this URL
  const { project_id } = request.params;
//using the params property to access the request url and insert dynamic data, in this case the project_id

  database('palettes').where('project_id', project_id).select()
//go to the database called palettes, use the where method to query the database. Look for the project_id record with a value of the project_id in the url. select this record to return in the response, returns a promise
    .then(palettes => response.status(200).json(palettes))
      //creates a response object, adds a status code to the response and parses the json data and includes the data in the response. Returns a promise
    .catch(error => console.log(`Error fetching palettes for project ${project_id}: ${error.message}`))
    //creates a response object for an error
});

//post new palette
app.post('/api/v1/projects/:project_id/palettes', (request, response) => {
//a post request to this URL
  const palette = request.body;
  // the body in out request is our pallette

  for (let requiredParameter of ['name', 'hex1', 'hex2', 'hex3', 'hex4', 'hex5', 'project_id']) {
  //the app is required to include all of these parameters as keys in this object
    if (!palette[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { title: <String>, hex1: <String>, hex2: <String>, hex3: <String>, hex4: <String>, hex5: <String>, project_id: <Number>} You're missing a "${requiredParameter}" property.` })
    }
      //checking to see if proper parameters are included, if not we are creating the response object
  }

  database('palettes').insert(palette, 'id')
  //insert our project and an id into the palettes table
    .then(palette => {
      response.status(201).json({ id: palette[0] })
    })
      //creates a response object, adds a status code to the response and parses the json data and includes the data in the response. Returns a promise
    .catch(error => {
      response.status(500).json({ error: error.message })
    });
    //creates a response object for an error
});

//delete a palette
app.delete('/api/v1/projects/:project_id/palettes/:palette_id', (request, response) => {
//a delete request to this URL
  const { project_id, palette_id } = request.params;

  database('palettes').where('id', palette_id).del()
  // go to the palettes table, use where to query the table and find this specific palette. .del() will remove the record, the data is then lost for good. returns a promise
    .then(palette => response.status(201).json({success: true}))
  //creates a response object, adds a status code to the response and parses the json data and includes the data in the response. Returns a promise
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
  //creates a response object for an error
});


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
//listen opens the port the server is running on, we get this message in the terminal when we are up and running





