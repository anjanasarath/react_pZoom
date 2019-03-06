import React from 'react';
import PropTypes from 'prop-types';
import RandomUID from "../utils/RandomUID";

const prefixID = 'react-svg-pan-zoom_miniature'

class MiniatureMask extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      offSet: null
    }

    this.drag = this.drag.bind(this);
  }

  startDrag = (evt) => {
    //evt.preventDefault();
    const mouseCoords = this.getMousePosition(evt);
    const offSetX = mouseCoords.x-parseFloat(this.zoomElem.getAttributeNS(null,"x"));
    const offSetY = mouseCoords.y-parseFloat(this.zoomElem.getAttributeNS(null,"y"));
    this.state.offSet = {
      x:offSetX,
      y:offSetY
    }
    this.props.onMouseDown(evt);
  }

  drag(evt) {
    if(this.state.offSet != null){
  //  evt.preventDefault();
    const mouseCoords = this.getMousePosition(evt);
    const zoomElem = this.zoomElem;
    const maskElem = this.maskElem;
    const zLeft = mouseCoords.x-this.state.offSet.x;
    const zTop = mouseCoords.y-this.state.offSet.y;
    const zRight = zLeft + parseFloat(zoomElem.getAttributeNS(null,"width"));
    const zBottom = zTop + parseFloat(zoomElem.getAttributeNS(null,"height"));

    const mLeft = parseFloat(maskElem.getAttributeNS(null,"x"));
    const mTop = parseFloat(maskElem.getAttributeNS(null,"y"));
    const mRight = mLeft + parseFloat(maskElem.getAttributeNS(null,"width"));
    const mBottom = mTop + parseFloat(maskElem.getAttributeNS(null,"height"));

    if( zLeft > mLeft && zRight < mRight && zTop > mTop && zBottom < mBottom){
      this.props.onMouseMove(evt);
    }
   }
 }

  endDrag = (evt) => {
    //evt.preventDefault();
    this.state.offSet = null;
    this.props.onMouseUp(evt);
  }

  startZoom = (evt) => {
    this.props.onWheel(evt);
  }

  getMousePosition = (evt) => {
    var pt = this.props.svgElement.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var result = pt.matrixTransform(evt.target.getScreenCTM().inverse());
    return {
      x: result.x,
      y: result.y
    };
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
            <rect ref={maskElem => this.maskElem = maskElem} x="0" y="0" width={SVGWidth} height={SVGHeight} fill="#ffffff"/>
            <rect ref={zoomElem => this.zoomElem = zoomElem} x={x1} y={y1} width={x2 - x1} height={y2 - y1}/>
          </mask>
        </defs>

        <rect
          onMouseDown={this.startDrag}
          onMouseMove={this.drag}
          onMouseUp={this.endDrag}
          onWheel={this.startZoom}
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
