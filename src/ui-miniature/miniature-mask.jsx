import React from 'react';
import PropTypes from 'prop-types';
import RandomUID from "../utils/RandomUID";

const prefixID = 'react-svg-pan-zoom_miniature'

class MiniatureMask extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  startDrag = (evt) => {
    evt.preventDefault();
    this.props.onMouseDown(evt);
  }

  drag = (evt) => {
    evt.preventDefault();
    this.props.onMouseMove(evt);
  }

  endDrag = (evt) => {
    evt.preventDefault();
    this.props.onMouseUp(evt);
  }

  render() {
    const draggable = {
      cursor: "move"
    }

    let {SVGWidth, SVGHeight, x1, y1, x2, y2, _uid} = this.props;
    let maskID = `${prefixID}_mask_${_uid}`
    return (
      <g>
        <defs>
          <mask id={maskID}>
            <rect x="0" y="0" width={SVGWidth} height={SVGHeight} fill="#ffffff"/>
            <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1}/>
          </mask>
        </defs>

        <rect
          onMouseDown={this.startDrag}
          onMouseMove={this.drag}
          onMouseUp={this.endDrag}
          x="0"
          y="0"
          width={SVGWidth}
          height={SVGHeight}
          style={{
            cursor:"move",
            fill: "#000",
            mask: `url(#${maskID})`,
            opacity: 0.4
          }}
        />
      </g>)
    }
}

MiniatureMask.propTypes = {
  SVGWidth: PropTypes.number.isRequired,
  SVGHeight: PropTypes.number.isRequired,
  x1: PropTypes.number.isRequired,
  y1: PropTypes.number.isRequired,
  x2: PropTypes.number.isRequired,
  y2: PropTypes.number.isRequired,
}

export default RandomUID(MiniatureMask)
