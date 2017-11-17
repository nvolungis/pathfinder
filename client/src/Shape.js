import React               from 'react';
import {Group, Rect, Text} from 'react-konva';
import ShapeMover          from './ShapeMover';
import Tip                 from './Tip';
import {textDimensions}    from './lib/text';

const fontSize   = 16;
const fontFamily = 'arial';

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
      this.props.setIsEditingText(this.props.id, true);
    };

    this.onMouseOver = e => {
      this.props.setIsHovering(this.props.id, true)
    };

    this.onMouseLeave = e => {
      this.props.setIsHovering(this.props.id, false)
    };
  }

  componentDidMount() {
    const {width, height} = this.dimensions();

    this.props.setDimensions(this.props.id, height, width);
  }

  componentWillUpdate(nextProps) {
    if (nextProps.text !== this.props.text) {
      const {width, height} = this.dimensions(nextProps);

      this.props.setDimensions(this.props.id, height, width);
    }
  }

  get color() {
    const {rgb} = this.state;
    return `rgb(${rgb.join(', ')})`;
  }

  dimensions(props = this.props) {
    const horPadding = 20;
    const verPadding = 30;
    const [textWidth, textHeight] = textDimensions(props.text, fontSize, fontFamily);
    const width =  textWidth + horPadding * 2;
    const height = textHeight + verPadding * 2;

    return {
      width,
      height,
      text: {
        x: (width - textWidth) / 2,
        y: (height - textHeight) / 2,
      }
    }
  }

  render() {
    const {
      height,
      width,
      text: {x: textX, y: textY}
    } = this.dimensions();

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
          fill='#ffffff'
          width={width}
          height={height}
          stroke={this.color}
          strokeWidth={2}
        />

        <Text
          x={textX}
          y={textY}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fill='black'
          align='center'
          text={this.props.text}
        />

        {!this.props.isEditingText && this.props.isHovering && (
          <ShapeMover
            isVisible={this.props.isHovering}
            onMove={this.onMove}
            onMoveEnd={this.onMoveEnd}
            onClick={e => e.cancelBubble = true}
          />
        )}

        {!this.props.isEditingText && this.props.isHovering && (
          <ShapeConnector
            width={width}
            isVisible={this.props.isHovering}
            createPotentialConnection={mousePos => {
              this.props.createPotentialConnection(this.props.id, mousePos)
            }}
            updatePotentialConnection={this.props.updatePotentialConnection}
            completePotentialConnection={this.props.completePotentialConnection}
          />
        )}

        {this.props.text === '' && (
          <Tip
            x={width / 2}
            y={0}
            text="Backspace again to remove me!"
          />
        )}
      </Group>
    );
  }
}

class ShapeConnector extends React.Component {
  constructor() {
    super();

    this.onMouseDown = e => {
      e.cancelBubble = true;
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
