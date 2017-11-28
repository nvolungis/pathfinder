import React                        from 'react';
import {Line, Group, Wedge}         from 'react-konva';
import {getAngle, len, getMinIndex} from './lib/point-math';

const getTanDeg = (deg) => {
  var rad = deg * Math.PI/180;
  return Math.tan(rad);
}

const getSinDeg = deg => {
  var rad = deg * Math.PI/180;
  return Math.sin(rad);
}

const getCosDeg = deg => {
  var rad = deg * Math.PI/180;
  return Math.cos(rad);
}

const enumeratePoints = (angle, to) => {
  return [{
      x : to.x - (to.w / 2),
      y : to.y + getTanDeg(angle) * (to.h / 2),
    }, {
      x : to.x - ((to.w / 2) / getTanDeg(angle)),
      y : to.y + (to.h / 2),
    }, {
      x : to.x + (to.w / 2),
      y : to.y - getTanDeg(angle) * (to.h / 2),
    }, {
      x : to.x + ((to.w / 2) / getTanDeg(angle)),
      y : to.y - (to.h / 2),
    }
  ]
};

const getPointIndex = (points, angle, to) => {
  if (angle >=90 && angle <270) {
    if(points[2].y < (to.y - (to.h / 2))) return 3;

    if(points[2].y > (to.y + (to.h / 2))) return 1;

    return 2;
  }

  if(points[2].y < (to.y - (to.h / 2))) return 1;

  if(points[2].y > (to.y + (to.h / 2))) return 3;

  return 0;
};

const getToPoint = (angle, to) => {
  const points = enumeratePoints(angle, to);
  const index = getPointIndex(points, angle, to);

  return points[index];
};

class Arrow extends React.Component {
  render() {
    const {from, to}       = this.props;
    const angle            = getAngle(from, to);
    const {x: tox, y: toy} = getToPoint(angle, to);

    return (
      <Group>
        <Line
          stroke="#000000"
          strokeWidth={2}
          points={[from.x, from.y, tox, toy]}
        />

        <Group
          rotation={-angle}
          x={tox}
          y={toy}
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
