import React         from 'react';
import {Group, Rect} from 'react-konva';

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
        onClick={e => this.props.onClick(e)}
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

