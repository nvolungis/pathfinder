import React         from 'react';
import {Layer, Line} from 'react-konva';

class Grid extends React.Component {
  constructor() {
    super();

    this.state = {
      gap   : 15,
      color : 'rgba(0,0,0,.05)',
    };
  }

  get height() {
    return window.innerHeight;
  }

  get width() {
    return window.innerWidth;
  }

  get rows() {
    const numRows = Math.ceil(this.height / this.state.gap) + 5;
    return Array.from(new Array(numRows))
  }

  get cols() {
    const numCols = Math.ceil(this.width / this.state.gap) + 5;
    return Array.from(new Array(numCols));
  }

  render() {
    return [
      this.rows.map((_, index) => (
        <Line
          strokeWidth={2}
          stroke={this.state.color}
          points={[0, index * this.state.gap, this.width, index * this.state.gap]}
        />
      )),

      this.cols.map((_, index) => (
        <Line
          strokeWidth={2}
          stroke={this.state.color}
          points={[index * this.state.gap, 0, index * this.state.gap, this.height]}
        />
      )),
    ]
  }
}

export default Grid;
