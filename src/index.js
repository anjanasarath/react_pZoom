import React from 'react';
import ReactDOM from 'react-dom';
import ReactSVGPanZoom from './viewer';

export {default as ReactSVGPanZoom} from './viewer';
export {default as Toolbar} from './ui-toolbar/toolbar';
export {default as Miniature} from './ui-miniature/miniature';
export {setPointOnViewerCenter, reset} from './features/common';
export {pan} from './features/pan';
export {zoom, fitSelection, fitToViewer, zoomOnViewerCenter} from './features/zoom';
export {openMiniature, closeMiniature} from './features/miniature'
export * from './constants';

export class Viewer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        radius:70,
        right: 600,
        bottom: 300,
        x: 108,
        y: 108.5,
      };
    	this.initDrag = this.initDrag.bind(this);
      this.drag = this.drag.bind(this);
      this.endDrag = this.endDrag.bind(this);
    }

drag(evt){
  const r = this.state.radius;
  const initWidth= 600;
  const initHeight = 300;
  const x = (evt.offsetX - this.Viewer.getValue().e) / this.Viewer.getValue().a;
  const y = (evt.offsetY - this.Viewer.getValue().f) / this.Viewer.getValue().a;

  //Update x and right when circle moves along x-axis
  if(x+r > initWidth) {
    this.setState({x,right:x+r});
  } else if(x-r > 0) {
    this.setState({x});
  }

  //Update y and bottom when circle moves along y-axis
  if(y+r > initHeight) {
    this.setState({y,bottom:y+r});
  } else if(y-r > 0) {
    this.setState({y});
  }
}

initDrag(evt){
  window.addEventListener('mousemove', this.drag);
  window.addEventListener('mouseup',this.endDrag);
};

endDrag() {
  window.removeEventListener('mousemove', this.drag);
  window.removeEventListener('mouseup', this.endDrag);
};
  render(){
    return (
    	<ReactSVGPanZoom
        ref={viewer => this.Viewer = viewer}
        width={500} height={500}
      >
        <svg id='svg-area' width={this.state.right} height={this.state.bottom}>
            <circle
              onMouseDown={this.initDrag}
              cx={this.state.x}
              cy={this.state.y}
              id='svg-circle'
              r={this.state.radius}
              fill="#0ff"
              stroke="#0ff"
            />
        </svg>
      </ReactSVGPanZoom>
  )
}
}

ReactDOM.render(
<Viewer />, document.getElementById('root'));
