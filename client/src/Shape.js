import React         from 'react';
import {Group, Rect} from 'react-konva';
import ShapeMover    from './ShapeMover';

class Shape extends React.Component {
  constructor(props) {
    super(props);

    const snap = pos => {
      const {gridGap} = this.props;
      return Math.floor(pos / gridGap) * gridGap;
    };

    this.state = {
      isMouseDown : false,
      isSelected  : false,
      rgb         : [0, 0, 0],
      rgbHover    : [0, 0, 255],
      startX      : 0,
      startY      : 0,
      x           : snap(this.props.x),
      y           : snap(this.props.y),
    };

    this.onMove = delta => {
      const position = {
        x: snap(this.state.x + delta.x),
        y: snap(this.state.y + delta.y),
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

        <ShapeConnector
          width={width}
          isVisible={this.state.isHovering}
          createPotentialConnection={mousePos => {
            this.props.createPotentialConnection(this.props.id, mousePos)
          }}
          updatePotentialConnection={this.props.updatePotentialConnection}
          completePotentialConnection={this.props.completePotentialConnection}
        />
      </Group>
    );
  }
}

class ShapeConnector extends React.Component {
  constructor() {
    super();

    this.onMouseDown = e => {
      const {layerX, layerY} = e.evt;
      this.props.createPotentialConnection({x: layerX, y: layerY});
      document.addEventListener('mouseup', this.onMouseUp);
      document.addEventListener('mousemove', this.onMouseMove);
    };

    this.onMouseMove = e => {
      const {layerX, layerY} = e;

      this.props.updatePotentialConnection({x: layerX, y: layerY});
    };

    this.onMouseUp = e => {
      this.props.completePotentialConnection();
      document.removeEventListener('mouseup', this.onMouseUp);
      document.removeEventListener('mousemove', this.onMouseMove);
    };
  }

  render() {
    const width  = 20;
    const height = 20;

    return (
      <Rect
        x={this.props.width - width}
        y={0}
        width={width}
        height={height}
        stroke="#000"
        strokeWidth={2}
        onMouseDown={this.onMouseDown}
      />
    )
  }
}

export default Shape;
