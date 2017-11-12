import React                from 'react';
import {Line, Group, Wedge} from 'react-konva';
import {getAngle}           from './lib/point-math';

class Arrow extends React.Component {
  render() {
    const {from, to} = this.props;
    const angle = getAngle(from, to);

    return (
      <Group>
        <Line
          stroke="#000000"
          strokeWidth={2}
          points={[from.x, from.y, to.x, to.y]}
        />

        <Group
          rotation={-angle}
          x={to.x}
          y={to.y}
          width={10}
          height={10}
        >
          <Wedge
            x={0}
            y={0}
            radius={15}
            angle={60}
            fill='black'
            rotation={150}
          />
        </Group>
      </Group>
    )
  }
}

export default Arrow;
