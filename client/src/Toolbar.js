import React    from 'react';
import { Rect } from 'react-konva';

class Toolbar extends React.Component {
  render() {
    return (
      <Rect
        x={20}
        y={20}
        height={40}
        width={120}
        fill="black"
      />
    );
  }
}

export default Toolbar;
