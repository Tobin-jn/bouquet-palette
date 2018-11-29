const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration)

app.use( bodyParser.json() );

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palettes'


//get all projects
app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects)
    })
    .catch((error) => {
      response.status(500).json({ error })
    });
});


//get specific project- so that we can post a new palette 
app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;
})


//post new project
app.post('/api/v1/projects', (request, response) => {
})


//post new palette
app.post('/api/v1/projects/:project_id/palettes', (request, response) => {
})


//delete exisiting palette
app.delete('/api/v1/projects/:project_id/palettes/:palette_id', (request, response) => {
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})





