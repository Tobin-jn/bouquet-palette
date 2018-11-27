// const hexCode = require('../utilities/utilities.js');

const $createPalette = $('.create-palette')


$createPalette.on('click', generatePalette)

function generatePalette() {
  const codeOne = generateHexCode()
  const codeTwo = generateHexCode()
  const codeThree = generateHexCode()
  const codeFour = generateHexCode()
  const codeFive = generateHexCode()

  updateColors(codeOne, codeTwo, codeThree, codeFour, codeFive)
}

function updateColors(codeOne, codeTwo, codeThree, codeFour, codeFive) {

  $('.color1').css('background', codeOne)
  $('li:nth-child(2)').css('background', codeTwo)
  $('.color3').css('background', codeThree)
  $('.color4').css('background', codeFour)
  $('.color5').css('background', codeFive)
}

 



const generateHexCode = () => {
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
  let hexCode = `#`
  for(let i = 0; i < 6; i++){
    hexCode += hexValues[Math.round(Math.random() * 15)]
  }
  return hexCode
}
