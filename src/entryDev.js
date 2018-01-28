import React from 'react';
import ReactDOM from 'react-dom';
import InfiniTex from './react/InfiniTex.jsx';
import {AppContainer} from 'react-hot-loader';
ReactDOM.render(
	<InfiniTex />,
	document.getElementById('app')
);
if (module.hot) {
	let render = () => {
		ReactDOM.render(<AppContainer><InfiniTex /></AppContainer>, document.getElementById('app'));
	}
	module.hot.accept(render);
}
