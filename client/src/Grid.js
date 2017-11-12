import React         from 'react';
import {Layer, Line} from 'react-konva';

class Grid extends React.Component {
  constructor() {
    super();

    this.state = {
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
    const numRows = Math.ceil(this.height / this.props.gap) + 5;
    return Array.from(new Array(numRows))
  }

  get cols() {
    const numCols = Math.ceil(this.width / this.props.gap) + 5;
    return Array.from(new Array(numCols));
  }

  render() {
    const {gap} = this.props;

    return [
      this.rows.map((_, index) => (
        <Line
          strokeWidth={2}
          stroke={this.state.color}
          points={[0, index * gap, this.width, index * gap]}
        />
      )),

      this.cols.map((_, index) => (
        <Line
          strokeWidth={2}
          stroke={this.state.color}
          points={[index * gap, 0, index * gap, this.height]}
        />
      )),
    ]
  }
}

export default Grid;
