
function generateHexCode() {
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "a", "b", "c", "d", "e", "f"]
  let hexCode = `#`
  for(let i = 0; i < 6; i++){
    hexCode += hexValues[Math.round(Math.random() * 16)]
  }
  return hexCode
}