import React                from 'react';
import {Group, Image, Rect} from 'react-konva';
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

      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);

      this.props.onMoveEnd();
    };
  }

  render() {
    const width = 20;
    const height= 20;

    return (
      <Group
        x={0}
        y={0}
        width={width}
        height={height}
        onMouseDown={this.onMouseDown}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke="#000"
          strokeWidth={2}
        />

      </Group>
    );
  }
}

export default ShapeMover;

