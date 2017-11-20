import React          from 'react';
import Connection     from './Connection';
import Shape          from './Shape';
import Grid           from './Grid';
import ShapeTextInput from './ShapeTextInput';
import MouseShadow    from './MouseShadow';

import {
  Layer,
  Rect,
  Stage
} from 'react-konva';

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

const getId = list => {
  let max = -1;

  list.forEach(item => { if (item.id > max) max = item.id });

  return max + 1;
};

class Editor extends React.Component {
  constructor() {
    super();

    this.state = {
      connections     : [],
      hasGrid         : true,
      height          : 0,
      gridGap         : 20,
      selectedShapeId : null,
      shapes          : [],
      width           : 0,
      padding         : 15,
      cursor          : null,
    };

    this.setCursor = type => {
      this.setState(state => {
        return {
          cursor: type === 'default' ? null : type,
        }
      });
    };

    this.onStageClick = e => {
      if (this.isEditingText) {
        this.setState(state => {
          const shapes = state.shapes.map(shape => ({...shape, isEditingText: false}));
          return { shapes }
        });
      } else {
        const {layerX, layerY} = e.evt;
        this.addShape({ x: layerX, y: layerY });
      }
    };

    this.addShape = ({x, y}) => {
      this.setState(state => {
        const shapes = state.shapes.concat([{
          id: getId(state.shapes),
          x, y,
          w: 0,
          h: 0,
          text: "fuck",
          isEditingText: true,
        }]);

        return {shapes};
      });
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
      this.setState(state => {
        let connections = state.connections;

        if (state.potentialConnection.toId !== undefined) {
          connections = state.connections.concat([[
            state.potentialConnection.fromId,
            state.potentialConnection.toId,
          ]]);
        }

        return {
          connections,
          potentialConnection: null,
        }
      });
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

    this.setShapeIsEditingText = (id, isEditingText) => {
      this.setState((state, props) => {
        return {shapes: state.shapes.map(shape => {
          if (shape.id === id) {
            return { ...shape, isEditingText};
          }

          return shape;
        })};
      });
    };

    this.setShapeIsHovering = (id, isHovering) => {
      this.setState((state, props) => {
        return {shapes: state.shapes.map(shape => {
          if (shape.id === id) {
            return { ...shape, isHovering};
          }

          return shape;
        })};
      });
    };

    this.updateShapeText = (id, text) => {
      this.setState((state, props) => {
        return {shapes: state.shapes.map(shape => {
          if (shape.id === id) {
            return { ...shape, text };
          }

          return shape;
        })};
      });
    };

    this.removeShape = id => {
      this.setState(state => {
        const shapes = state.shapes.filter(shape => shape.id !== id);
        const connections = state.connections.filter(conn => !conn.includes(id));

        return {connections, shapes};
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

  get isEditingText() {
    return !!this.state.shapes.find(shape => shape.isEditingText);
  }

  get isHoveringOverShape() {
    return !!this.state.shapes.find(shape => shape.isHovering);
  }

  get isAddIconVisible() {
    return !this.isEditingText &&
    !this.isHoveringOverShape &&
    !this.state.potentialConnection
  }

  get potentialConnectionData() {
    const {potentialConnection, shapes} = this.state;
    const from = shapes.find(shape => shape.id === potentialConnection.fromId);

    const to = potentialConnection.toId !== undefined
      ? shapes.find(shape => shape.id === potentialConnection.toId)
      : { ...potentialConnection.mousePos, w: 0, h: 0 }

      return { from, to }
  }

  get wrapperStyle() {
    const cursor = this.state.cursor
      ? this.state.cursor
      : this.isAddIconVisible
        ? 'none'
        : 'default';

    return { cursor }
  }

  render() {
    const {connections, shapes, width, height, potentialConnection} = this.state;

    return (
      <div style={this.wrapperStyle}>
      <Stage width={width} height={height}>
        <Layer>
          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            onClick={this.onStageClick}
          />
            {this.state.hasGrid && <Grid gap={this.state.gridGap} />}

            {connections.map((conn, index) => (
              <Connection
                key={index}
                from={shapes.find(shape => shape.id === conn[0])}
                to={shapes.find(shape => shape.id === conn[1])}
              />
            ))}

            {potentialConnection && (
              <Connection
                from={this.potentialConnectionData.from}
                to={this.potentialConnectionData.to}
              />
            )}
            {this.state.shapes.map(shape => (
              <Shape
                gridGap={this.state.gridGap}
                snapToGrid={this.state.hasGrid}
                id={shape.id}
                x={shape.x}
                y={shape.y}
                w={shape.w}
                h={shape.h}
                text={shape.text}
                isSelected={shape.id === this.state.selectedShapeId}
                isEditingText={shape.isEditingText}
                isHovering={shape.isHovering}
                key={shape.id}
                updateShape={this.updateShape}
                createPotentialConnection={this.createPotentialConnection}
                updatePotentialConnection={this.updatePotentialConnection}
                completePotentialConnection={this.completePotentialConnection}
                setCursor={this.setCursor}
                setDimensions={this.setShapeDimensions}
                setIsEditingText={this.setShapeIsEditingText}
                setIsHovering={this.setShapeIsHovering}
              />
            ))}

          </Layer>
          <Layer hitGraphEnabled={false}>
            <MouseShadow
              isVisible={this.isAddIconVisible}
            />
          </Layer>
        </Stage>
        {this.state.shapes.map(shape => (
          <ShapeTextInput
            key={shape.id}
            shape={shape}
            padding={this.state.padding}
            onTextChange={this.updateShapeText}
            setIsEditingText={this.setShapeIsEditingText}
            setIsHovering={this.setShapeIsHovering}
            remove={this.removeShape}
          />
        ))}
      </div>
    )
  }
}

export default Editor;
