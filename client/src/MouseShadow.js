import React from 'react';

import {
  Circle,
  Group,
  Line,
} from 'react-konva';

class MouseShadow extends React.Component {
  constructor() {
    super();
    this.state = {x: 0, y: 0};

    this.onMouseMove = e => {
      this.setState({x: e.clientX, y: e.clientY});
    };
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  render() {
    const {x, y} = this.state;
    const radius = 20;
    const arrowRadius = 12;
    const stroke = 4;

    if (!this.props.isVisible) return null;

    return (
      <Group x={x} y={y}>
        <Circle radius={radius} stroke="black" />
        <Line strokeWidth={stroke} stroke="black" points={[0, -arrowRadius, 0, arrowRadius]} />
        <Line strokeWidth={stroke} stroke="black" points={[-arrowRadius, 0, arrowRadius, 0]} />
      </Group>
    )
  }
}

export default MouseShadow;
