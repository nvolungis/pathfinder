import React from 'react';
import Arrow from './Arrow';

import {
  getAnchorPoints,
  getMinIndex,
  len
} from './lib/point-math';

const getPoint = shape => {
  const {x, y, w, h} = shape;

  return {
    x: x + w / 2,
    y: y + h / 2 ,
    w,
    h,
  };
};


class Connection extends React.Component {
  render() {
    const from = getPoint(this.props.from);
    const to   = getPoint(this.props.to);

    return <Arrow from={from} to={to} />
  }
}

export default Connection;
