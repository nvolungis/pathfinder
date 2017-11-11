import React                 from 'react';
import {Circle, Group, Rect} from 'react-konva';
import {getAnchorPoints}     from './util';

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

  renderAnchors(color) {
    const {h, w} = this.props;

    return getAnchorPoints({w, h}).map(point => (
      <Circle
        x={point.x}
        y={point.y}
        radius={5}
        fill={color}
      />
    ));
  }

  render() {
    const width     = this.props.w;
    const height    = this.props.h;
    const baseColor = this.props.isSelected ? "0, 0, 255" : "0, 0, 0";
    const dotAlpha  = this.props.isSelected ? 1 : 0;
    const color     = `rgb(${baseColor})`;
    const dotColor  = `rgba(${baseColor}, ${dotAlpha})`;

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

        {this.renderAnchors(dotColor)}
      </Group>
    );
  }
}

export default Shape;
