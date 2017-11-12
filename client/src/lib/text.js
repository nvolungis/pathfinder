export const textDimensions = (text, fontSize, fontFamily="arial") => {
  const ctx = Object.assign(document.createElement("canvas").getContext("2d"), {
    font: `${fontSize}px ${fontFamily}`
  })

  return [
    ctx.measureText(text).width,
    fontSize,
  ];
};
