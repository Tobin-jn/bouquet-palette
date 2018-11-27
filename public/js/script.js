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
  }
  if (!$('.color2').attr('disabled')) {
    $('.color2').css('background', codeTwo)
  }
  if (!$('.color3').attr('disabled')) {
    $('.color3').css('background', codeThree)
  }
  if (!$('.color4').attr('disabled')) {
    $('.color4').css('background', codeFour)
  }
  if (!$('.color5').attr('disabled')) {
    $('.color5').css('background', codeFive)
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
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
  let hexCode = `#`
  for(let i = 0; i < 6; i++){
    hexCode += hexValues[Math.round(Math.random() * 15)]
  }
  return hexCode
}
