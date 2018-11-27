const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use( bodyParser.json() );

// app.locals

app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palettes Galore'

app.use(express.static('public'));



app.get('/', (request, response) => {
//serbve the html page
});

app.get('api/v1/palette', (request, response) => {
//should provide colors for new palette
  return
})

//POST a new saved pallete, project will be part of the body

//GET a saved pallete- return the colors


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})