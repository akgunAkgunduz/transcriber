const root = document.querySelector(':root')
const cssVariables = getComputedStyle(root)

module.exports = {
  color1: cssVariables.getPropertyValue('--color1'),
  color2: cssVariables.getPropertyValue('--color2'),
  color3: cssVariables.getPropertyValue('--color3'),
  color4: cssVariables.getPropertyValue('--color4')
}