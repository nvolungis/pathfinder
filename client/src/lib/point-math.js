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

export const getMinIndex = list => {
  let min = {index: 0, len: list[0]};

  list.forEach((item, index) => {
    if (item < min.len) {
      min = {len: item, index};
    }
  });

  return min.index;
};

export const len = (p1, p2) => {
  return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2))
};

