import React         from 'react';
import Connection    from './Connection';
import DownpourStage from './DownpourStage';
import Shape         from './Shape';

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      connections: [[0, 1], [1, 2], [2, 3], [3, 0]],
      height: 0,
      selectedShapeId: null,
      shapes: [
        { id: 0, x: 600, y: 100, w: 75, h: 50 },
        { id: 1, x: 800, y: 300, w: 75, h: 50 },
        { id: 2, x: 600, y: 500, w: 75, h: 50 },
        { id: 3, x: 400, y: 300, w: 75, h: 50 },
      ],
      width: 0,
    };

    this.onShapeClick = (e, id) => {
      this.setState({selectedShapeId: id});
    };

    this.onStageClick = (e) => {
      this.setState({selectedShapeId: null});
    };

    this.updateShape = (id, position) => {
      const shapes = this.state.shapes.map(shape => {
        if (shape.id === id) {
          return { ...shape, ...position }
        }

        return shape;
      })

      this.setState({shapes});
    };

    this.updateDims = (e) => {
      this.setState({
        width  : window.innerWidth,
        height : window.innerHeight,
      })
    };

    window.addEventListener('resize', this.updateDims);
  }

  componentDidMount() {
    this.updateDims();
  }

  render() {
    const {connections, shapes, width, height} = this.state;

    return (
      <DownpourStage width={width} height={height} onClick={this.onStageClick}>
        {this.state.shapes.map(shape => (
          <Shape
            id={shape.id}
            x={shape.x}
            y={shape.y}
            w={shape.w}
            h={shape.h}
            isSelected={shape.id === this.state.selectedShapeId}
            key={shape.id}
            onClick={this.onShapeClick}
            updateShape={this.updateShape}
          />
        ))}

        {connections.map((conn, index) => (
          <Connection
            key={index}
            from={shapes[conn[0]]}
            to={shapes[conn[1]]}
          />
        ))}

      </DownpourStage>
    )
  }
}

export default Editor;
