export const getAnchorPoints = (point, position="relative") => {
  const {w, h, x, y} = point;

  const points = [
    { x: (w / 2) , y: 0       },
    { x: w       , y: (h / 2) },
    { x: (w / 2) , y: h       },
    { x: 0       , y: (h / 2) },
  ];

  if (position === "relative") return points;

  return points.map(aPoint => ({
    x: aPoint.x + x,
    y: aPoint.y + y,
  }));
};

