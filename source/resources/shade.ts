
export const parse = (color: string, percent: number) => {
    var f = parseInt(color.slice(1), 16), t = percent < 0 ? 0 : 255, p = percent < 0 ? percent * -1 : percent, R = f >> 16, G = f >> 8 & 0x00FF, B = f & 0x0000FF;
    return "#" + (0x1000000 + (Math.round((t - R) * p) + R) * 0x10000 + (Math.round((t - G) * p) + G) * 0x100 + (Math.round((t - B) * p) + B)).toString(16).slice(1);
}

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
