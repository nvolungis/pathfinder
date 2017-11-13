import React         from 'react';
import Connection    from './Connection';
import DownpourStage from './DownpourStage';
import Shape         from './Shape';
import Grid          from './Grid';

import {
  getAnchorPoints,
  getMinIndex,
  len
} from './lib/point-math';

const closest = (shapes, mousePos) => {
  const shapeLens = shapes.map(shape => {
    const pointLens = getAnchorPoints(shape, "absolute").map(point => len(point, mousePos));
    const minIndex  = getMinIndex(pointLens);

    return {id: shape.id, len: pointLens[minIndex]}
  });

  let min = shapeLens[0];

  shapeLens.forEach(entry => {
    if (entry.len < min.len) {
      min = entry;
    }
  });

  return min;
};

class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      connections: [],
      hasGrid: true,
      height: 0,
      gridGap: 20,
      selectedShapeId: null,
      shapes: [
        { id: 0, x: 600, y: 100, w: 75, h: 50 },
        { id: 1, x: 800, y: 300, w: 75, h: 50 },
        { id: 2, x: 600, y: 500, w: 75, h: 50 },
        { id: 3, x: 400, y: 300, w: 75, h: 50 },
      ],
      text: 'hi',
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
        potentialConnection: {fromId: id, mousePos}
      });
    };

    this.updatePotentialConnection = mousePos => {
      const {shapes, potentialConnection} = this.state;
      const closestShape = closest(shapes, mousePos);
      const isntSelf = closestShape.id !== potentialConnection.fromId;
      const isWithinThreshold = closestShape.len <= 20;
      const toId = isntSelf && isWithinThreshold ? closestShape.id : undefined;

      this.setState({
        potentialConnection: {
          ...potentialConnection,
          mousePos,
          toId,
        }
      });
    };

    this.completePotentialConnection = () => {
      const {connections, potentialConnection} = this.state;

      if (potentialConnection.toId !== undefined) {
        this.setState({
          connections: connections.concat([[
            potentialConnection.fromId,
            potentialConnection.toId,
          ]])
        })
      }

      this.setState({ potentialConnection: null });
    };

    this.setShapeDimensions = (id, height, width) => {
      this.setState((state, props) => {
        return {shapes: state.shapes.map(shape => {
          if (shape.id === id) {
            return { ...shape, h: height, w: width };
          }

          return shape;
        })};
      });
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDims);
    this.updateDims();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDims);
  }

  get potentialConnectionData() {
    const {potentialConnection, shapes} = this.state;

    if (potentialConnection.toId !== undefined) {
      return {
        from : shapes[potentialConnection.fromId],
        to   : shapes[potentialConnection.toId],
      }
    }

    return {
      from: shapes[potentialConnection.fromId],
      to: {
        ...potentialConnection.mousePos,
        w: 0, h: 0,
      }
    }
  }

  render() {
    const {connections, shapes, width, height, potentialConnection} = this.state;

    return (
      <div>
        <DownpourStage width={width} height={height} onClick={this.onStageClick}>
          {this.state.hasGrid && <Grid gap={this.state.gridGap} />}
          {this.state.shapes.map(shape => (
            <Shape
              gridGap={this.state.gridGap}
              snapToGrid={this.state.hasGrid}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              w={shape.w}
              h={shape.h}
              text={this.state.text}
              isSelected={shape.id === this.state.selectedShapeId}
              key={shape.id}
              onClick={this.onShapeClick}
              updateShape={this.updateShape}
              createPotentialConnection={this.createPotentialConnection}
              updatePotentialConnection={this.updatePotentialConnection}
              completePotentialConnection={this.completePotentialConnection}
              setDimensions={this.setShapeDimensions}
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
              from={this.potentialConnectionData.from}
              to={this.potentialConnectionData.to}
            />
          )}
        </DownpourStage>
        <section style={{position: 'absolute', top: 0, background: 'white'}}>
          <input
            type="text"
            value={this.state.text}
            onChange={e => this.setState({text: e.target.value})}
          />
        </section>
      </div>
    )
  }
}

export default Editor;
