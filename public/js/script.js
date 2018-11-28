// const hexCode = require('../utilities/utilities.js');

const $createPalette = $('.create-palette')


$createPalette.on('click', generatePalette)
$('.color1').on('click', lockColor)
$('.color2').on('click', lockColor)
$('.color3').on('click', lockColor)
$('.color4').on('click', lockColor)
$('.color5').on('click', lockColor)


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
  }
  if (!$('.color2').attr('disabled')) {
    $('.color2').css('background', codeTwo)
    $('.code2').text(codeTwo).css('color', codeTwo)
  }
  if (!$('.color3').attr('disabled')) {
    $('.color3').css('background', codeThree)
    $('.code3').text(codeThree).css('color', codeThree)
  }
  if (!$('.color4').attr('disabled')) {
    $('.color4').css('background', codeFour)
    $('.code4').text(codeFour).css('color', codeFour)
  }
  if (!$('.color5').attr('disabled')) {
    $('.color5').css('background', codeFive)
    $('.code5').text(codeFive).css('color', codeFive)
  }
}

function lockColor() {
  if (!$(this).attr('disabled')) {
    $(this).attr("disabled", true) 
  } else {
    $(this).removeAttr("disabled")
  }
}
 



const generateHexCode = () => {
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]
  let hexCode = `#`
  for(let i = 0; i < 6; i++){
    hexCode += hexValues[Math.round(Math.random() * 15)]
  }
  return hexCode
}
