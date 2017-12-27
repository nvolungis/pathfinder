import React               from 'react';
import {
  Group,
  Line,
  Rect,
  Text,
} from 'react-konva';

const fontSize   = 16;
const fontFamily = 'arial';

const attrs = {
  x: 0,
  y: 0,
  width: 30,
  height: 30,
};

const txtAttrs = {
  ...attrs,
  fontSize,
  fontFamily,
  fill: 'white',
  align: 'center',
  y: 7,
};

const Btn = props => (
  <Group x={props.x} y={0}>
    <Rect
      {...attrs}
      fill="black"
    />
    {props.children}
  </Group>
);

const height          = 30
const width           = 90;
const triangleWidth   = 20;
const triangleHeight  = 10;
const spaceFromTarget = 5;

const trianglePoints = () => {
  const p1 = [(width / 2) - (triangleWidth / 2), height];
  const p2 = [p1[0] + triangleWidth, height];
  const p3 = [p1[0] + (triangleWidth / 2), height + triangleHeight];

  return p1.concat(p2).concat(p3);
};

export const ButtonGroup = props => {
  const x = props.x - width / 2;
  const y = - (height + triangleHeight + spaceFromTarget);

  return (
    <Group x={x} y={y}>
      <Rect
        {...attrs}
        fill="black"
        width={width}
      />

      <Btn x={0}>
        <Text
          {...txtAttrs}
          text="A"
        />
      </Btn>

      <Btn x={30}>
        <Text
          {...txtAttrs}
          text="B"
        />
      </Btn>

      <Btn x={60}>
        <Text
          {...txtAttrs}
          text="C"
        />
      </Btn>

      <Line
        points={trianglePoints()}
        stroke="black"
        strokeWidth={2}
        closed={true}
        fill="black"
      />

    </Group>
  )
};
