import React from 'react';
import PropTypes from 'prop-types';
import RandomUID from "../utils/RandomUID";

const prefixID = 'react-svg-pan-zoom_miniature'

class MiniatureMask extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.zoomElem = React.createRef();
    this.maskElem = React.createRef();

    this.state = {
      offset: null,
      draggable: false
    }
  }

    startDrag = (evt) => {

      const zoomElem = this.zoomElem.current;
      const scope = this.getMousePosition(evt);
      const zoomElemX = parseFloat(zoomElem.getAttributeNS(null, "x"));
      const zoomElemY = parseFloat(zoomElem.getAttributeNS(null, "y"));
      const zoomElemW = parseFloat(zoomElem.getAttributeNS(null, "width"));
      const zoomElemH = parseFloat(zoomElem.getAttributeNS(null, "height"));

      if(scope.x > zoomElemX && scope.x < zoomElemX + zoomElemW && scope.y > zoomElemY && scope.y < zoomElemY + zoomElemH) {
        this.state.draggable = true;
        this.state.offset = {
          x: scope.x - zoomElemX,
          y: scope.y - zoomElemY
        };
      }
  }

  drag = (evt) => {
    if (this.state.draggable) {
     const svgCoordinates = this.getMousePosition(evt);

     const maskElemnt = this.maskElem.current;
     const zoomElemnt = this.zoomElem.current;

     const maskElemntX = parseFloat(maskElemnt.getAttributeNS(null, "x"));
     const maskElemntY = parseFloat(maskElemnt.getAttributeNS(null, "y"));
     const maskElemntW = parseFloat(maskElemnt.getAttributeNS(null, "width"));
     const maskElemntH = parseFloat(maskElemnt.getAttributeNS(null, "height"));

     const zoomElemntX = svgCoordinates.x-this.state.offset.x;
     const zoomElemntY = svgCoordinates.y-this.state.offset.y;
     const zoomElemntW = parseFloat(zoomElemnt.getAttributeNS(null, "width"));
     const zoomElemntH = parseFloat(zoomElemnt.getAttributeNS(null, "height"));

     if(zoomElemntX > maskElemntX && (zoomElemntX + zoomElemntW) < (maskElemntX + maskElemntW) && zoomElemntY > maskElemntY && (zoomElemntY + zoomElemntH) < (maskElemntY + maskElemntH)) {
        evt.preventDefault();
        zoomElemnt.setAttributeNS(null, "x", zoomElemntX);
        zoomElemnt.setAttributeNS(null, "y", zoomElemntY);
    }
   }
  }

  endDrag = (evt) => {
    this.state.draggable = false;
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

    let {SVGWidth, SVGHeight, x1, y1, x2, y2, zoomToFit, _uid} = this.props;
    let maskID = `${prefixID}_mask_${_uid}`
    return (
      <g>
        <defs>
          <mask id={maskID}>
            <rect ref={this.maskElem} x="0" y="0" width={SVGWidth} height={SVGHeight} fill="#ffffff"/>
            <rect ref={this.zoomElem} x={x1} y={y1} width={x2 - x1} height={y2 - y1}/>
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
  zoomToFit: PropTypes.number.isRequired,
}

export default RandomUID(MiniatureMask)
