
// This function returns a shade based on a give hex and a corresponding percentage, a value may range between -1 and 1. (a higher value means a lighter color)
export const parse = (color: string, percent: number) => {
  let f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF
  return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1)
}

// Converts a hex color to the required css object format.
export const wrap = (hex: string) => `
#app, #main-content, body {
  --primary-alt: ${parse(hex, 0.90)} !important;
  --primary-10: ${parse(hex, 0.90)} !important;
  --primary-25: ${parse(hex, 0.75)} !important;
  --primary-50: ${parse(hex, 0.50)} !important;
  --primary-75: ${parse(hex, 0.25)} !important;
  --primary-90: ${parse(hex, 0.10)} !important;

  --primary: ${parse(hex, 0)} !important;

  --primary-110: ${parse(hex, -0.10)} !important;
  --primary-125: ${parse(hex, -0.25)} !important;
  --primary-150: ${parse(hex, -0.50)} !important;
  --primary-175: ${parse(hex, -0.75)} !important;
  --primary-190: ${parse(hex, -0.90)} !important;

  --v-button-background-color: ${parse(hex, 0)} !important;
  --v-button-background-color-hover: ${parse(hex, -0.10)} !important;
  --sidebar-detail-color-active: ${parse(hex, -0.10)} !important;
}
    `.trim()

// Ensures that any given hex color can be seen infront of a white background.
// -->> Implementation by https://github.com/vanling - Thanks!
export const contrast = (bgColor: any, lightColor: any, darkColor: any) => {
  const color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor

  let r = parseInt(color.substring(0, 2), 16)
  let g = parseInt(color.substring(2, 4), 16)
  let b = parseInt(color.substring(4, 6), 16)

  let uicolors = [r / 255, g / 255, b / 255]
  let c = uicolors.map((col) =>
    col <= 0.03928
      ? col / 12.92
      : Math.pow((col + 0.055) / 1.055, 2.4)
  )

  let L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2])
  return (L > 0.179) ? darkColor : lightColor
}

// Returns a random shade (color) in HEX.
export const random = () => {
  const r = Math.floor(Math.random() * 128) + 64
  const g = Math.floor(Math.random() * 128) + 64
  const b = Math.floor(Math.random() * 128) + 64
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}
