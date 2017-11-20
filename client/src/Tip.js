import React               from 'react';
import {Line, Rect, Text, Group} from 'react-konva';
import {textDimensions}    from './lib/text';

const fontSize        = 14;
const fontFamily      = 'helvetica';
const horPadding      = 20;
const vertPadding     = 15;
const spaceFromTarget = 10;

class Tip extends React.Component {
  constructor() {
    super();
    this.triangleHeight = 10;
    this.triangleWidth  = 20;
  }

  dimensions(props = this.props) {
    const [textWidth, textHeight] = textDimensions(props.text, fontSize, fontFamily);
    const width  = textWidth + horPadding * 2;
    const height = textHeight + vertPadding * 2;

    return {
      width,
      height,
      text: {
        x: (width - textWidth) / 2,
        y: (height - textHeight) / 2,
      }
    }
  }

  get trianglePoints() {
    const {
      height,
      width,
    } = this.dimensions();

    const p1 = [(width / 2) - (this.triangleWidth / 2), height];
    const p2 = [p1[0] + this.triangleWidth, height];
    const p3 = [p1[0] + (this.triangleWidth / 2), height + this.triangleHeight];

    return p1.concat(p2).concat(p3);
  }

  render() {
    const {
      height,
      width,
      text: {x: textX, y: textY}
    } = this.dimensions();


    const x = this.props.x - width / 2;
    const y = this.props.y - (height + this.triangleHeight + spaceFromTarget);

    return (
      <Group x={x} y={y} width={width} height={height}>
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="black"
          cornerRadius={5}
        />

        <Line
          points={this.trianglePoints}
          stroke="black"
          strokeWidth={2}
          closed={true}
          fill="black"
        />

        <Text
          x={textX}
          y={textY}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fill='white'
          align='center'
          text={this.props.text}
        />
      </Group>
    );
  }
}

export default Tip;
