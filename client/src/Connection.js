import React  from 'react';
import {Line} from 'react-konva';

const len = (p1, p2) => Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2))

const getPoints = point => {
  const {x, y, w, h} = point;

  return [
    { x: x     , y: y     },
    { x: x + w , y: y     },
    { x: x + w , y: y + h },
    { x: x     , y: y + h },
  ]
};

const getMinIndex = list => {
  let min = {index: 0, len: list[0]};

  list.forEach((item, index) => {
    if (item < min.len) {
      min = {len: item, index};
    }
  });

  return min.index;
};

const getPoint = (p1, p2) => {
  const points = getPoints(p1);
  const lens   = points.map((p) => len(p, p2));
  const index  = getMinIndex(lens);

  return points[index];
};

class Connection extends React.Component {
  render() {
    let {from, to} = this.props;

    from = getPoint(from, to);

    return <Line
      stroke="#000000"
      strokeWidth={2}
      points={[from.x, from.y, to.x, to.y]}
    />;
  }
}

export default Connection;
