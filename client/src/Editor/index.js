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
      console.log(this.props)
      this.props.onClick(e, this.props.id);
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
      width: 0,
      selectedShapeId: null,
      shapes: [
        { id: 0, },
        { id: 1, }
      ]
    };

    this.onShapeClick = (e, id) => {
      this.setState({selectedShapeId: id});
    };

    this.onStageClick = (e) => {
      this.setState({selectedShapeId: null});
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
        {this.state.shapes.map(shape => (
          <Shape
            id={shape.id}
            isSelected={shape.id == this.state.selectedShapeId}
            key={shape.id}
            onClick={this.onShapeClick}
          />
        ))}
      </DownpourStage>
    )
  }
}

export default Editor;
