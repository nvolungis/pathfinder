import React from 'react';
import {
  Circle,
  Group,
  Stage,
  Rect,
  Layer,
  Line,
} from 'react-konva';


class DownpourStage extends React.Component {
  render() {
    const dims = {
      height: this.props.height,
      width: this.props.width
    };

    return (
      <Stage {...dims}>
        <Layer>
          <Rect x={0} y={0} {...dims} onClick={this.props.onClick}/>
          {this.props.children}
        </Layer>
      </Stage>
    )
  }
}

class Connection extends React.Component {
  render() {
    const {from, to} = this.props;
    return <Line
      stroke="#000000"
      strokeWidth={2}
      points={[from.x, from.y, to.x, to.y]}
    />;
  }
}

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
      isMouseDown: false,
      isSelected: false,
      startX: 0,
      startY: 0,
      x: this.props.x,
      y: this.props.y,
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
  }

  render() {
    const width     = 50;
    const height    = 50;
    const baseColor = this.props.isSelected ? "0, 0, 255" : "0, 0, 0";
    const dotAlpha  = this.props.isSelected ? 1 : 0;
    const color     = `rgb(${baseColor})`;
    const dotColor  = `rgba(${baseColor}, ${dotAlpha})`;

    console.log('x', this.props.x);

    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        width={width}
        height={height}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
      >
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          stroke={color}
          strokeWidth={2}
        />

        <Circle
          x={0}
          y={0}
          radius={5}
          fill={dotColor}
        />

        <Circle
          x={width}
          y={0}
          radius={5}
          fill={dotColor}
        />

        <Circle
          x={width}
          y={height}
          radius={5}
          fill={dotColor}
        />

        <Circle
          x={0}
          y={height}
          radius={5}
          fill={dotColor}
        />
      </Group>
    );
  }
}


class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      connections: [[0, 1]],
      height: 0,
      width: 0,
      selectedShapeId: null,
      shapes: [
        { id: 0, x: 10, y: 10 },
        { id: 1, x: 300, y: 10 }
      ],
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
          return {
            ...shape,
            ...position,
          }
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

          {connections.map(conn => (
            <Connection from={shapes[conn[0]]} to={shapes[conn[1]]} />
          ))}

      </DownpourStage>
    )
  }
}

export default Editor;
