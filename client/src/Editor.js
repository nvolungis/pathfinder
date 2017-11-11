import React         from 'react';
import Connection    from './Connection';
import DownpourStage from './DownpourStage';
import Shape         from './Shape';

class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      connections: [[0, 1]],
      height: 0,
      selectedShapeId: null,
      shapes: [
        { id: 0, x: 10, y: 10 },
        { id: 1, x: 300, y: 10 }
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
