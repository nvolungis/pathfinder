import React  from 'react';
import {Line} from 'react-konva';

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

export default Connection;
