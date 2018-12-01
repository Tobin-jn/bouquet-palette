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

//get specific project- 
app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params;

  database('projects').where('id', id).select()
    .then(project => response.status(200).json(project))
    .catch(error => console.log(`Error fetching project: ${error.message}`))
})

//get palettes of a specific project
app.get('/api/v1/projects/:project_id/palettes', (request, response) => {
  const { project_id } = request.params;

  database('palettes').where('project_id', project_id).select()
    .then(palettes => response.status(200).json(palettes))
    .catch(error => console.log(`Error fetching palettes for project ${project_id}: ${error.message}`))
})

//post new palette

app.post('/api/v1/projects/:project_id/palettes', (request, response) => {
  const palette = request.body;

  for (let requiredParameter of ['name', 'hex1', 'hex2', 'hex3', 'hex4', 'hex5', 'project_id']) {
    if (!palette[requiredParameter]) {
      return response.status(422).send({ error: `Expected format: { title: <String>, hex1: <String>, hex2: <String>, hex3: <String>, hex4: <String>, hex5: <String>, project_id: <Number>} You're missing a "${requiredParameter}" property.` })
    }
  }

  database('palettes').insert(palette, 'id')
    .then(palette => {
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    });
});

//delete a palette
app.delete('/api/v1/projects/:project_id/palettes/:palette_id', (request, response) => {
  const { project_id, palette_id } = request.params;

  database('palettes').where('id', palette_id).del()
    .then(palette => response.status(201).json({success: true}))
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
});


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})





