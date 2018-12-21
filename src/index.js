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

export const Viewer = () => (
    	<ReactSVGPanZoom
        width={500} height={500}
        onClick={event => console.log(event.x, event.y, event.originalEvent)}>

        <svg id='svg-area' width={617} height={316}>
            <circle
              id='svg-circle'
              cx={100}
              cy={100}
              r="70"
              fill="#0ff"
              stroke="#0ff"
            />
        </svg>
      </ReactSVGPanZoom>
  )

ReactDOM.render(
<Viewer />, document.getElementById('root'));
