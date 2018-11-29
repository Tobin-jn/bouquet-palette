// const hexCode = require('./utilities.js');

const $createPalette = $('.create-palette')

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

function saveProject(e) {
  e.preventDefault()
  let name = $('.new-project-input').val()
  let projectName = { name }
  postProject(projectName)
  $('.new-project-input').val('')
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



//type in a project name
//input .new-project-input
//button .save-project-btn
//click save
//grab the value
//send value to backend via a post request






//move to utitlity
const generateHexCode = () => {
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]
  let hexCode = `#`
  for(let i = 0; i < 6; i++){
    hexCode += hexValues[Math.round(Math.random() * 15)]
  }
  return hexCode
}
