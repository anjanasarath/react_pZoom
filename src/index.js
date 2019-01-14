import React from 'react';
import ReactDOM from 'react-dom';
import ReactSVGPanZoom from './viewer';

class Example extends React.Component{

constructor(props) {
    super(props);
    this.state = {
      x: 108,
      y: 108.5,
    };
  	this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

  }

  handleMouseMove(e){
    console.log("hi")
      const x = (e.offsetX - this.Viewer.getValue().e) / this.Viewer.getValue().a;
      const y = (e.offsetY - this.Viewer.getValue().f) / this.Viewer.getValue().a;
      this.setState({
        x,
        y,
      })
    };


  handleMouseDown(e){
    const mousemove = this.handleMouseMove;
    const mouseup = this.handleMouseUp;
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
  };

  handleMouseUp() {
    const mousemove = this.handleMouseMove;
    const mouseup = this.handleMouseUp;
      let value = Object.assign({}, this.Viewer.getValue());
    if (this.state.x>value.SVGWidth) {
        // If x-coordinate crosses svg-width then update svg-width
        value.SVGWidth = this.state.x + 100;
    }
    if (this.state.y>value.SVGHeight) {
            // If y-coordinate crosses svg-width then update svg-width
            value.SVGHeight = this.state.y + 100;
    }

    this.Viewer.setValue(
          value
    );
        window.removeEventListener('mousemove', mousemove);
    window.removeEventListener('mouseup', mouseup);
  };

    render () {
      return (
        <ReactSVGPanZoom
        ref={viewer => this.Viewer = viewer}
        width={500} height={500}
        detectAutoPan={false}
      >
        <svg width={617} height={316}>
            <circle
              onMouseDown={this.handleMouseDown}
              cx={this.state.x}
              cy={this.state.y}
              r="100"
              fill="#0ff"
              stroke="#0ff"
            />
        </svg>
      </ReactSVGPanZoom>
    );
  }
 }


ReactDOM.render(
  <div><Example /></div>,
  document.getElementById('root')
);
