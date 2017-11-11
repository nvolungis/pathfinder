import React from 'react';
import { Layer, Rect, Stage } from 'react-konva';

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

export default DownpourStage;
