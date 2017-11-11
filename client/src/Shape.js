import React from 'react';
import {Circle, Group, Rect} from 'react-konva';

class Shape extends React.Component {
  constructor(props) {
    super(props);

    const onDrag = e => {
      const position = {
        x: this.state.x + (e.layerX - this.state.startX),
        y: this.state.y + (e.layerY - this.state.startY),
      };

      this.props.updateShape(this.props.id, position);

      return position;
    };

    this.state = {
      isMouseDown: false,
      isSelected: false,
      startX: 0,
      startY: 0,
      x: this.props.x,
      y: this.props.y,
    };

    this.onClick = (e) => {
      e.cancelBubble = true;
      this.setState({isSelected: true});
      this.props.onClick(e, this.props.id);
    };

    this.onMouseDown = (e) => {
      this.setState({
        isMouseDown: true,
        startX: e.evt.layerX,
        startY: e.evt.layerY,
      });

      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
    };

    this.onMouseMove = (e) => {
      if (!this.state.isMouseDown) return;

      onDrag(e);
    };

    this.onMouseUp = (e) => {
      if (!this.state.isMouseDown) return;

      this.setState({
        isMouseDown: false,
      });

      const position = onDrag(e);
      this.setState({...position});
    };
  }

  render() {
    const width     = 50;
    const height    = 50;
    const baseColor = this.props.isSelected ? "0, 0, 255" : "0, 0, 0";
    const dotAlpha  = this.props.isSelected ? 1 : 0;
    const color     = `rgb(${baseColor})`;
    const dotColor  = `rgba(${baseColor}, ${dotAlpha})`;

    console.log('x', this.props.x);

    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        width={width}
        height={height}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke={color}
          strokeWidth={2}
        />

        <Circle
          x={0}
          y={0}
          radius={5}
          fill={dotColor}
        />

        <Circle
          x={width}
          y={0}
          radius={5}
          fill={dotColor}
        />

        <Circle
          x={width}
          y={height}
          radius={5}
          fill={dotColor}
        />

        <Circle
          x={0}
          y={height}
          radius={5}
          fill={dotColor}
        />
      </Group>
    );
  }
}

export default Shape;
