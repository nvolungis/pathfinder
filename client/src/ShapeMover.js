import React                from 'react';
import {Group, Rect, Image} from 'react-konva';
import move                 from './move.png';

class ShapeMover extends React.Component {
  constructor() {
    super();

    this.state = {
      isMouseDown : false,
      startX      : 0,
      startY      : 0,
      image       : null,
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

  componentDidMount() {
    const image = new window.Image();
    image.src = move;
    image.onload = () => {
      this.setState({
        image: image
      });
    }
  }

  render() {
    const width = 15;
    const height= 15;

    return (
      <Group
        x={5}
        y={5}
        width={width}
        height={height}
        onMouseDown={this.onMouseDown}
        onClick={e => this.props.onClick(e)}
      >
        {this.state.image && (
          <Image
            image={this.state.image}
            height={height}
            width={width}
          />
        )}

      </Group>
    );
  }
}

export default ShapeMover;

