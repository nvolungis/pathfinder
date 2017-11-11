import React         from 'react';
import Connection    from './Connection';
import DownpourStage from './DownpourStage';
import Shape         from './Shape';
import {Line}        from 'react-konva';

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

    this.createPotentialConnection = (id, mousePos) => {
      this.setState({
        potentialConnection: {id, mousePos}
      });
    };

    this.updatePotentialConnection = mousePos => {
      console.log('move', mousePos);
      this.setState({
        potentialConnection: {
          ...this.state.potentialConnection,
          mousePos,
        }
      });
    };

    this.completePotentialConnection = () => {
      this.setState({ potentialConnection: null });
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDims);
    this.updateDims();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDims);
  }

  render() {
    const {connections, shapes, width, height, potentialConnection} = this.state;

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
            createPotentialConnection={this.createPotentialConnection}
            updatePotentialConnection={this.updatePotentialConnection}
            completePotentialConnection={this.completePotentialConnection}
          />
        ))}

        {connections.map((conn, index) => (
          <Connection
            key={index}
            from={shapes[conn[0]]}
            to={shapes[conn[1]]}
          />
        ))}

        {potentialConnection && (
          <Connection
            from={shapes[potentialConnection.id]}
            to={{
              ...potentialConnection.mousePos,
              w: 0, h: 0,
            }}
          />
        )}

      </DownpourStage>
    )
  }
}

export default Editor;
