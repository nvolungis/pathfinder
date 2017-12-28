import React from 'react';

const DELETE_KEY = 8;
const ENTER_KEY = 13;

class ShapeTextInput extends React.Component {
  constructor() {
    super();

    this.onKeyDown = ({keyCode}) => {
      if (keyCode === DELETE_KEY && this.props.shape.text === '') {
        this.props.remove(this.props.shape.id)
      }

      if (keyCode === ENTER_KEY) {
        this.props.setIsEditingText(this.props.shape.id, false);
        this.props.setIsHovering(this.props.shape.id, true)
      }
    };
  }

  componentDidMount() {
    if (this.props.isEditingText) {
      this.input.focus();
      this.input.select();
    }
  }

  get style () {
    const {x, y, h, w} = this.props.shape;

    return {
      position: 'absolute',
      left: `${x+1}px`,
      top: `${y+1}px`,
      height: `${h-2}px`,
      width: `${w-2}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: this.props.isEditingText ? 1 : -1,
    }
  }

  get inputStyle () {
    return {
      width: `100%`,
      height: `100%`,
      textAlign: 'center',
      fontFamily: 'helvetica',
      fontSize: "16px",
      boxSizing: 'border-box',
    }
  }

  componentWillReceiveProps(nextProps) {
    const {isEditingText} = this.props.shape;

    if (nextProps.shape.isEditingText && !isEditingText) {
      this.input.focus();
      this.input.select();
    }
  }

  render() {
    const {onTextChange, shape} = this.props;

    return (
      <div
        style={this.style}
        onClick={e => this.props.setIsEditingText(shape.id, false)}
      >
        <input
          ref={el => this.input = el}
          type="text"
          value={shape.text}
          style={this.inputStyle}
          onChange={(e) => onTextChange(shape.id, e.target.value)}
          onKeyDown={this.onKeyDown}
          onClick={e => e.stopPropagation()}
        />
      </div>
    )
  }
}

export default ShapeTextInput;
