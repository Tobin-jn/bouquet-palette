//invoke when document is ready
$(generatePalette)
$(getProjects)

// const hexCode = require('./utilities.js');

const $createPalette = $('.create-palette')
let currentColors = {}



//create a new palette on load

$createPalette.on('click', generatePalette)
$('.color1').on('click', lockColor)
$('.color2').on('click', lockColor)
$('.color3').on('click', lockColor)
$('.color4').on('click', lockColor)
$('.color5').on('click', lockColor)

//refactor to make code in utility
function generatePalette() {
  const codeOne = generateHexCode()
  const codeTwo = generateHexCode()
  const codeThree = generateHexCode()
  const codeFour = generateHexCode()
  const codeFive = generateHexCode()

  updateColors(codeOne, codeTwo, codeThree, codeFour, codeFive)
  currentColors = {
    hex1: codeOne,
    hex2: codeTwo,
    hex3: codeThree,
    hex4: codeFour,
    hex5: codeFive,
  }
}

function updateColors(codeOne, codeTwo, codeThree, codeFour, codeFive) {

  if (!$('.color1').attr('disabled')) {
    $('.color1').css('background', codeOne)
    $('.code1').text(codeOne).css('color', codeOne)
    $('.circle1').css('background', codeOne)
  }
  if (!$('.color2').attr('disabled')) {
    $('.color2').css('background', codeTwo)
    $('.code2').text(codeTwo).css('color', codeTwo)
    $('.circle2').css('background', codeTwo)
  }
  if (!$('.color3').attr('disabled')) {
    $('.color3').css('background', codeThree)
    $('.code3').text(codeThree).css('color', codeThree)
    $('.circle3').css('background', codeThree)
  }
  if (!$('.color4').attr('disabled')) {
    $('.color4').css('background', codeFour)
    $('.code4').text(codeFour).css('color', codeFour)
    $('.circle4').css('background', codeFour)
  }
  if (!$('.color5').attr('disabled')) {
    $('.color5').css('background', codeFive)
    $('.code5').text(codeFive).css('color', codeFive)
    $('.circle5').css('background', codeFive)
  }
}

function lockColor() {
  if (!$(this).attr('disabled')) {
    $(this).attr("disabled", true) 
  } else {
    $(this).removeAttr("disabled")
  }
}
 




 //CREATE A NEW PROJECT

$('.save-project-btn').on('click', saveProject)
$('.save-palette-btn').on('click', savePalette)

$('.new-palette-input').on('keyup', enableBtn)
$('.new-project-input').on('keyup', enableBtn)

function enableBtn() {
  if ($('.new-palette-input').val()) {
    $('.save-palette-btn').prop('disabled', false);
  }
  if ($('.new-project-input').val()) {
    $('.save-project-btn').prop('disabled', false);
  }
}

function saveProject(e) {
  e.preventDefault()
  let name = $('.new-project-input').val()
  let projectName = { name }
  postProject(projectName)
  $('.new-project-input').val('')
  $('.save-project-btn').prop('disabled', true);
}

function postProject(projectName) {
  return fetch('/api/v1/projects', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(projectName)
  })
   .then(response => response.json())
   .then(res => console.log('Successfully posted a new Project:', JSON.stringify(res)))
   .catch(error => console.log('Error posting project:', error));
}

//Get Projects and populate dropdown

function getProjects() {
  return fetch('/api/v1/projects')
    .then(response => response.json())
    .then(data => projectsSelection(data))
    .catch(error => console.log('Error getting all project:', error));
}

function projectsSelection(projects) {
  return projects.forEach( project => {
    let newOption = $(`<option class='show-project-selection' value='${project.id}'>${project.name}</option> `)
    $('select').append(newOption)
  })
}

//Save a palette

function savePalette(e) {
  e.preventDefault()
  const name = $('.new-palette-input').val()
  const id = parseInt($('#project-select').val(), 10)
  const newPalette = {
    name, 
    ...currentColors, 
    project_id: id
  }
  postPalette(newPalette)
  $('.new-palette-input').val('')
  $('.save-palette-btn').prop('disabled', true);
}

function postPalette(palette) {
  const url = `/api/v1/projects/${palette.project_id}/palettes`

  return fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify(palette)
  })
   .then(response => response.json())
   .then(res => console.log('Successfully posted a new Palette:', JSON.stringify(res)))
   .catch(error => console.log('Error posting palette:', error));
}













//move to utitlity
function generateHexCode() {
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]
  let hexCode = `#`
  for(let i = 0; i < 6; i++){
    hexCode += hexValues[Math.round(Math.random() * 15)]
  }
  return hexCode
}
