function generateHexCode() {
  const hexValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"]
  let hexCode = `#`

  for(let i = 0; i < 6; i++){
    hexCode += hexValues[Math.round(Math.random() * 15)]
  }
  return hexCode
}

export function paletteHexCodes() {
  return {
    hex1: generateHexCode(),
    hex2: generateHexCode(),
    hex3: generateHexCode(),
    hex4: generateHexCode(),
    hex5: generateHexCode(),
  }
}


