import {paletteHexCodes} from './utilities.js'
import {postProject, getProjects, postPalette, getPalettes,  deletePalette} from './apiCalls.js'

$(getProjects)

const $createPalette = $('.create-palette')
let currentColors = {}


$createPalette.on('click', generatePalette)

$('.color1').on('click', lockColor)
$('.color2').on('click', lockColor)
$('.color3').on('click', lockColor)
$('.color4').on('click', lockColor)
$('.color5').on('click', lockColor)

$('.save-project-btn').on('click', saveProject)
$('.save-palette-btn').on('click', savePalette)

$('.new-palette-input').on('keyup', enableBtn)
$('.new-project-input').on('keyup', enableBtn)

$('.show-palettes-btn').on('click', showPalettes)

$('.project-palettes').on('click', removePalette)
$('.project-palettes').on('click', selectPalette)


function generatePalette() {
  const codes = paletteHexCodes()
  currentColors = {
    hex1: codes.hex1,
    hex2: codes.hex2,
    hex3: codes.hex3,
    hex4: codes.hex4,
    hex5: codes.hex5,
  }
  updateColors(codes.hex1, codes.hex2, codes.hex3, codes.hex4, codes.hex5)
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


function showPalettes(e) {
  e.preventDefault()
  const id = parseInt($('#project-palette-select').val(), 10)
  getPalettes(id)
}


function removePalette() {
  let paletteId; 
  const projectId = parseInt($('#project-palette-select').val(), 10)

  if(event.target.className === 'delete-palette'){
    paletteId = event.target.attributes.value.value
    event.target.parentElement.remove()
    deletePalette(paletteId, projectId)
  }
}


function selectPalette() {
  if(event.target.className === 'palette-name') {
    const paletteColors = event.target.nextElementSibling.children
    console.log(event.target.nextElementSibling.children)
    updateColors(    
      paletteColors[0].dataset.id,
      paletteColors[1].dataset.id,
      paletteColors[2].dataset.id,
      paletteColors[3].dataset.id,
      paletteColors[4].dataset.id
    )
  }
}



// function postProject(projectName) {

//   return fetch('/api/v1/projects', {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json; charset=utf-8"
//     },
//     body: JSON.stringify(projectName)
//   })
//    .then(response => response.json())
//    .then(res => location.reload())
//    .then(res => console.log('Successfully posted a new Project:', JSON.stringify(res)))
//    .catch(error => console.log('Error posting project:', error));
// }

//Get Projects and populate dropdown

// function getProjects() {
//   return fetch('/api/v1/projects')
//     .then(response => response.json())
//     .then(data => projectsSelection(data))
//     .catch(error => console.log('Error getting all project:', error));
// }

// function projectsSelection(projects) {
//   return projects.forEach( project => {
//     let newOption = $(`<option class='show-project-selection' value='${project.id}'>${project.name}</option> `)
//     $('select').append(newOption)
//   })
// }

// function postPalette(palette) {
//   const url = `/api/v1/projects/${palette.project_id}/palettes`

//   return fetch(url, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json; charset=utf-8"
//     },
//     body: JSON.stringify(palette)
//   })
//    .then(response => response.json())
//    .then(res => console.log('Successfully posted a new Palette:', JSON.stringify(res)))
//    .catch(error => console.log('Error posting palette:', error));
// }




// function getPalettes(id) {
//   const url = `/api/v1/projects/${id}/palettes`

//   return fetch(url)
//     .then(response => response.json())
//     .then(data => clearPalettes(data))
//     .catch(error => console.log(`Error getting palettes for Project ${id}:`, error))
// }

// function clearPalettes(data) {
//   if ($('.palette-wrapper').length){
//     $('.palette-wrapper').remove()
//   }
//   renderPalettes(data)
// }

// function renderPalettes(palettes) {
//   return palettes.forEach( palette => {
//     const newPalettes = `
//       <div class="palette-wrapper">
//         <h3 class="palette-name">${palette.name}</h3>
//         <div class="hex-codes">
//           <i class="fas fa-circle" style="color:${palette.hex1};" data-id="${palette.hex1}"></i>
//           <i class="fas fa-circle" style="color:${palette.hex2};" data-id="${palette.hex2}"></i>
//           <i class="fas fa-circle" style="color:${palette.hex3};" data-id="${palette.hex3}"></i>
//           <i class="fas fa-circle" style="color:${palette.hex4};" data-id="${palette.hex4}"></i>
//           <i class="fas fa-circle" style="color:${palette.hex5};" data-id="${palette.hex5}"></i>
//         </div>
//       <h4 class="delete-palette" value="${palette.id}">X</h4>
//     </div>`

//     $('.project-palettes').append(newPalettes)
//   })
// }



// function deletePalette(paletteId, projectId) {
//   const url = `/api/v1/projects/${projectId}/palettes/${paletteId}`

//   return fetch(url, {
//     method: 'DELETE',
//     headers: {
//       "Content-Type": "application/json; charset=utf-8"
//     },
//   })
//    .then(response => response.json())
//    .then(res => console.log('Successfully deleted palette:', JSON.stringify(res)))
//    .catch(error => console.log('Error deleting palette:', error));
// }















///ISSUES

//lock icons- how to do it different??

//ORGANIZATION
  //API file
  //utility file

//make variables where necessary to DRY code
//clean up HTML
//toggle() for lock functionality?? is toggle only css related?? Use for icon?
