import React               from 'react';
import ShapeMover          from './ShapeMover';
import Tip                 from './Tip';
import {textDimensions}    from './lib/text';

import {Group, Rect, Text, Line} from 'react-konva';

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
      rgbEditing  : [255, 192, 203],
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

    this.onMoverClick = e => {
      e.cancelBubble = true;
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

    // if (!nextProps.isEditingText && this.props.isEditingText) {
    //   this.props.setIsHovering(this.props.id, true)
    // }
  }

  get color() {
    const {rgb, rgbEditing} = this.state;
    const color = this.props.isEditingText ? rgbEditing : rgb;
    return `rgb(${color.join(', ')})`;
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
        height: textHeight,
        width: textWidth,
        x: (width - textWidth) / 2,
        y: (height - textHeight) / 2,
      }
    }
  }

  render() {
    const {
      height,
      width,
      text: {
        x: textX,
        y: textY,
        width: textWidth,
        height: textHeight,
      }
    } = this.dimensions();

    return (
      <Group
        x={this.props.x}
        y={this.props.y}
        width={width}
        height={height}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        ref={node => this.node = node}
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

        {!this.props.isEditingText && this.props.isHovering && (
          <ShapeMover
            height={height}
            width={width}
            isVisible={this.props.isHovering}
            onMove={this.onMove}
            onMoveEnd={this.onMoveEnd}
            onClick={this.onMoverClick}
            setCursor={this.props.setCursor}
          />
        )}

        <Text
          x={textX}
          y={textY}
          fontSize={fontSize}
          fontFamily={fontFamily}
          fill='black'
          align='center'
          text={this.props.text}
        />

        <Rect
          x={textX - 4}
          y={textY - 4}
          width={textWidth + 8}
          height={textHeight + 8}
          onClick={this.onClick}
          onMouseEnter={() => this.props.setCursor('text')}
          onMouseLeave={() => this.props.setCursor('default')}
          // onMouseDown={e => e.cancelBubble}
        />

        {!this.props.isEditingText && this.props.isHovering && (
          <ShapeConnector
            width={width}
            isVisible={this.props.isHovering}
            createPotentialConnection={mousePos => {
              this.props.createPotentialConnection(this.props.id, mousePos)
            }}
            updatePotentialConnection={this.props.updatePotentialConnection}
            completePotentialConnection={this.props.completePotentialConnection}
            setCursor={this.props.setCursor}
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
    const height = 30;

    return (
      <Group
        width={this.props.width}
        height={height}
        x={0}
        y={0}
      >
        <Group
          x={this.props.width - width}
          y={0}
          width={width}
          height={height}
        >

          <ArrowIcon />

          <Rect
            x={0}
            y={0}
            width={width}
            height={height}
            onMouseDown={this.onMouseDown}
            onMouseEnter={() => this.props.setCursor('-webkit-grab')}
            onMouseLeave={() => this.props.setCursor('default')}
          />
        </Group>
      </Group>
    )
  }
}

const ArrowIcon = () => {
  const width  = 20;
  const height = 30;

  const p1 = [0         , height/2];
  const p2 = [width     , height/2];
  const p3 = [p2[0] - 5 , p2[1] - 5];
  const p4 = [width     , height/2];
  const p5 = [p2[0] - 5 , p2[1] + 5];

  const linePoints = p1.concat(p2);

  const arrowheadPoints = p3.concat(p4).concat(p5);

  return (
    <Group>
      <Line
        stroke="black"
        strokeWidth={2}
        points={arrowheadPoints}
        lineCap="round"
      />

      <Line
        stroke="black"
        strokeWidth={2}
        points={linePoints}
        lineCap="round"
      />
    </Group>
  )
}

export default Shape;
