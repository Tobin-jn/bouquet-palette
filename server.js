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
      response.status(500).json({ error: error.message })
    });
});

//post new project
app.post('/api/v1/projects', (request, response) => {
  const project = request.body

  for (let requiredParameter of ['name']) {
    if (!project[requiredParameter]) {
      return response.status(422).send({ error: 'Missing a Project Name' });
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    });
});



//get specific project- so that we can post a new palette 
app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;

  database('projects').where('id', id).select()
    .then(project => response.status(200).json(project))
    .catch(error => console.log(`Error fetching project: ${error.message}`))
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





