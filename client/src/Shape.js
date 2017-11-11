import React                from 'react';
import {Group, Rect, Image} from 'react-konva';
import move                 from './move.png';

class ShapeMoverImage extends React.Component {
  constructor() {
    super();

    this.state = { image: null };
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = move;
    image.onload = () => {
      this.setState({ image: image });
    }
  }

  render() {
    if (!this.state.image) return null;

    return (
      <Image
        image={this.state.image}
        width={this.props.width}
        height={this.props.height}
      />
    )
  }
}


class ShapeMover extends React.Component {
  constructor() {
    super();

    this.state = {
      isMouseDown : false,
      startX      : 0,
      startY      : 0,
    };

    this.onMouseDown = (e) => {
      this.setState({
        isMouseDown : true,
        startX      : e.evt.layerX,
        startY      : e.evt.layerY,
      });

      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
    };

    this.onMouseMove = (e) => {
      if (!this.state.isMouseDown) return;

      const position = {
        x: (e.layerX - this.state.startX),
        y: (e.layerY - this.state.startY),
      };

      this.props.onMove(position);
    };

    this.onMouseUp = (e) => {
      if (!this.state.isMouseDown) return;

      this.setState({
        isMouseDown: false,
      });

      this.props.onMoveEnd();
    };
  }

  render() {
    const width = 20;
    const height= 20;

    return (
      <Group
        x={5}
        y={5}
        width={width}
        height={height}
        onMouseDown={this.onMouseDown}
      >
        {this.props.isVisible && <ShapeMoverImage width={width} height={height} />}

      </Group>
    );
  }
}


class Shape extends React.Component {
  constructor(props) {
    super(props);

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

    this.onMove = delta => {
      const position = {
        x: this.state.x + delta.x,
        y: this.state.y + delta.y,
      };

      this.props.updateShape(this.props.id, position);
    };

    this.onMoveEnd = () => {
      this.setState({
        x: this.props.x,
        y: this.props.y,
      });
    };

    this.onClick = (e) => {
      e.cancelBubble = true;
      this.setState({isSelected: true});
      this.props.onClick(e, this.props.id);
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

        <ShapeMover
          isVisible={this.state.isHovering}
          onMove={this.onMove}
          onMoveEnd={this.onMoveEnd}
        />
      </Group>
    );
  }
}

export default Shape;
