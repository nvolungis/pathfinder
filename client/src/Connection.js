import React  from 'react';
import {Line} from 'react-konva';

import {
  getAnchorPoints,
  getMinIndex,
  len
} from './lib/point-math';

const optimizePoint1 = (p1, p2) => {
  const points = getAnchorPoints(p1, "absolute");
  const lens   = points.map(p => len(p, p2));
  const index  = getMinIndex(lens);

  return points[index];
};

const optimizeConnection = (from, to) => {
  const fromOptim = optimizePoint1(from, to);
  const toOptim = optimizePoint1(to, from);

  return {from: fromOptim, to: toOptim};
};

class Connection extends React.Component {
  render() {
    const {from, to} = optimizeConnection(this.props.from, this.props.to);

    return <Line
      stroke="#000000"
      strokeWidth={2}
      points={[from.x, from.y, to.x, to.y]}
    />;
  }
}

export default Connection;
