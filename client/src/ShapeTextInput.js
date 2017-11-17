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
      }
    };
  }

  componentDidMount() {
    if (this.props.shape.isEditingText) {
      this.input.focus();
      this.input.select();
    }
  }

  get style () {
    const {x, y, h, w} = this.props.shape;

    return {
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      height: `${h}px`,
      width: `${w}px`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: this.props.shape.isEditingText ? 1 : -1,
    }
  }

  get inputStyle () {
    const {w} = this.props.shape;
    const {padding} = this.props;
    const width = w - (padding * 2);

    return {
      width: `${width}px`,
      textAlign: 'center',
      fontFamily: 'arial',
      fontSize: "16px",
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
