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

export const getSlope = (p1, p2) => {
  return (p2.y - p1.y) / (p2.x - p1.x);
};

const getQuadrant = (p1, p2) => {
  const xDistance = p2.x - p1.x;
  const yDistance = -(p2.y - p1.y);

  if(xDistance >=0 && yDistance >= 0) return 1;
  if(xDistance <=0 && yDistance >= 0) return 2;
  if(xDistance <=0 && yDistance <= 0) return 3;
  if(xDistance >=0 && yDistance <= 0) return 4;
};

export const getAngle = (p1, p2) => {
  const angle    = Math.atan2(p2.x - p1.x, -(p2.y - p1.y)) *(180 / Math.PI)
  const quadrant = getQuadrant(p1, p2);

  const adjustAngle = () => {
    switch(quadrant) {
      case 1:
      case 2:
      case 3: return 90 - angle;
      case 4: return 90 - angle + 360;
      default: return angle;
    }
  };

  return adjustAngle();
};
