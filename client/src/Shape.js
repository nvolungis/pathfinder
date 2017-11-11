import React         from 'react';
import {Group, Rect} from 'react-konva';

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
      isMouseDown : false,
      isSelected  : false,
      rgb         : [0, 0, 0],
      rgbHover    : [0, 0, 255],
      startX      : 0,
      startY      : 0,
      x           : this.props.x,
      y           : this.props.y,
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

    this.onMouseOver = e => {
      this.setState({isHovering: true});
    };

    this.onMouseLeave = e => {
      this.setState({isHovering: false});
    };
  }

  get color() {
    const {isHovering, rgb, rgbHover} = this.state;
    const color = isHovering ? rgbHover : rgb;
    return `rgb(${color.join(', ')})`;
  }

  get anchorColor() {
    const {isHovering, rgb, rgbHover} = this.state;
    const alpha = isHovering ? 1 : 0;
    const color = isHovering ? rgbHover : rgb;
    return `rgba(${color.join(', ')}, ${alpha})`;
  }

  render() {
    const width  = this.props.w;
    const height = this.props.h;

    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        width={width}
        height={height}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke={this.color}
          strokeWidth={2}
        />
      </Group>
    );
  }
}

export default Shape;
