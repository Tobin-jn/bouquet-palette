import {paletteHexCodes} from './utilities.js';
import {postProject, getProjects, postPalette, getPalettes,  deletePalette} from './apiCalls.js';

$(getProjects)
$(document).ready(function() {
  if (JSON.parse(localStorage.getItem('currentColors'))) {
    let colors= JSON.parse(localStorage.getItem('currentColors'));;
    currentColors = {...colors};
    updateColors(colors.hex1, colors.hex2, colors.hex3, colors.hex4, colors.hex5)
    localStorage.clear();
  } else {
    generatePalette()
  }
});

let currentColors = {};


$('.create-palette').on('click', generatePalette);

$('.flower1').on('click', lockColor);
$('.flower2').on('click', lockColor);
$('.flower3').on('click', lockColor);
$('.flower4').on('click', lockColor);
$('.flower5').on('click', lockColor);

$('.save-project-btn').on('click', saveProject);
$('.save-palette-btn').on('click', savePalette);

$('.new-palette-input').on('keyup', enableBtn);
$('.new-project-input').on('keyup', enableBtn);

$('.show-palettes-btn').on('click', showPalettes);

$('.project-palettes').on('click', removePalette);
$('.project-palettes').on('click', selectPalette);


 

function enableBtn() {
  if ($('.new-palette-input').val()) {
    $('.save-palette-btn').prop('disabled', false);
  }
  if ($('.new-project-input').val()) {
    $('.save-project-btn').prop('disabled', false);
  }
}


function generatePalette() {
  const codes = paletteHexCodes();

  updateColors(codes.hex1, codes.hex2, codes.hex3, codes.hex4, codes.hex5)
}


function lockColor() {
  if (!$(this).attr('disabled')) {
    $(this).attr("disabled", true);
    $(this).css("border-bottom", "solid 3px #ba5a19");
  } else {
    $(this).removeAttr("disabled");
    $(this).css("border-bottom", "solid 3px white");
  }
}


function removePalette() {
  let paletteId; 
  const projectId = parseInt($('#project-palette-select').val(), 10);

  if(event.target.className === 'delete-palette'){
    paletteId = event.target.attributes.value.value;
    event.target.parentElement.remove();
    deletePalette(paletteId, projectId)
  }
}


function saveColors() {
  currentColors = {
    hex1: $('#flower1-petals1')[0].attributes.fill.value,
    hex2: $('#flower2-petals1')[0].attributes.fill.value,
    hex3: $('#flower3-petals1')[0].attributes.fill.value,
    hex4: $('#flower4-petals1')[0].attributes.fill.value,
    hex5: $('#flower5-petals1')[0].attributes.fill.value,
  }
}


function savePalette(e) {
  e.preventDefault()
  const name = $('.new-palette-input').val();
  const id = parseInt($('#project-select').val(), 10);
  const newPalette = {
    name, 
    ...currentColors, 
    project_id: id
  };
  postPalette(newPalette)
  $('.new-palette-input').val('');
  $('.save-palette-btn').prop('disabled', true);
}


function saveProject(e) {
  e.preventDefault()
  localStorage.setItem('currentColors', JSON.stringify(currentColors));

  let name = $('.new-project-input').val();
  let projectName = { name };
  postProject(projectName)

  $('.new-project-input').val('');
  $('.save-project-btn').prop('disabled', true);
}


function selectPalette() {
  if(event.target.className === 'palette-name') {
    const paletteColors = event.target.nextElementSibling.children;
    updateColors(    
      paletteColors[0].dataset.id,
      paletteColors[1].dataset.id,
      paletteColors[2].dataset.id,
      paletteColors[3].dataset.id,
      paletteColors[4].dataset.id
    )
  }
}


function showPalettes(e) {
  e.preventDefault()
  const id = parseInt($('#project-palette-select').val(), 10);
  getPalettes(id)
}


function updateColors(codeOne, codeTwo, codeThree, codeFour, codeFive) {
  if (!$('.flower1').attr('disabled')) {
    $('#flower1-petals1')[0].attributes.fill.value = codeOne;
    $('#flower1-petals2')[0].attributes.fill.value = codeOne;
    $('.code1').text(codeOne).css('color', codeOne);
    $('.circle1').css('background', codeOne);
  }
  if (!$('.flower2').attr('disabled')) {
    $('#flower2-petals1')[0].attributes.fill.value = codeTwo;
    $('#flower2-petals2')[0].attributes.fill.value = codeTwo;
    $('.code2').text(codeTwo).css('color', codeTwo);
    $('.circle2').css('background', codeTwo);
  }
  if (!$('.flower3').attr('disabled')) {
    $('#flower3-petals1')[0].attributes.fill.value = codeThree;
    $('#flower3-petals2')[0].attributes.fill.value = codeThree;
    $('.code3').text(codeThree).css('color', codeThree);
    $('.circle3').css('background', codeThree);
  }
  if (!$('.flower4').attr('disabled')) {
    $('#flower4-petals1')[0].attributes.fill.value = codeFour;
    $('#flower4-petals2')[0].attributes.fill.value = codeFour;
    $('.code4').text(codeFour).css('color', codeFour);
    $('.circle4').css('background', codeFour);
  }
  if (!$('.flower5').attr('disabled')) {
    $('#flower5-petals1')[0].attributes.fill.value = codeFive;
    $('#flower5-petals2')[0].attributes.fill.value = codeFive;
    $('.code5').text(codeFive).css('color', codeFive);
    $('.circle5').css('background', codeFive);
  }
  saveColors()
}



