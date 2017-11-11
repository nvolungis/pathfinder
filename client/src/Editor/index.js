import React from 'react';
import {
  Stage,
  Rect,
  Layer,
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


class Shape extends React.Component {
  constructor() {
    super();

    this.state = {
      isSelected: false,
      startX: 0,
      startY: 0,
      x: 10,
      y: 10,
    };

    this.onClick = (e) => {
      e.cancelBubble = true;
      this.setState({isSelected: true});
      this.props.onClick(e);
    }

    this.onDragEnd = (e) => {
      this.setState({
        x: this.state.x + (e.evt.layerX - this.state.startX),
        y: this.state.y + (e.evt.layerY - this.state.startY),
      });
    };

    this.onMouseDown = (e) => {
      this.setState({
        startX: e.evt.layerX,
        startY: e.evt.layerY,
      });
    }
  }

  render() {
    return (
       <Rect
          x={this.state.x}
          y={this.state.y}
          width={50}
          height={50}
          stroke={this.props.isSelected ? '#0000ff' : '#000000'}
          strokeWidth={2}
          onClick={this.onClick}
          draggable={true}
          onMouseDown={this.onMouseDown}
          onDragEnd={this.onDragEnd}
        />
    );
  }
}



class Editor extends React.Component {
  constructor() {
    super();
    this.state = {
      height: 0,
      isSelected: false,
      width: 0,
    };

    this.onShapeClick = (e) => {
      this.setState({ isSelected: true });
    };

    this.onStageClick = (e) => {
      this.setState({ isSelected: false })
    };

    this.updateDims = (e) => {
      this.setState({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    };

    window.addEventListener('resize', this.updateDims);
  }

  componentDidMount() {
    this.updateDims();
  }


  render() {
    const {width, height} = this.state;

    return (
      <DownpourStage width={width} height={height} onClick={this.onStageClick}>
        <Shape
          onClick={this.onShapeClick}
          isSelected={this.state.isSelected}
        />
      </DownpourStage>
    )
  }
}

export default Editor;
