import React from 'react';
import ReactDOM from 'react-dom';

import { Table } from '../src';

ReactDOM.render(
	<div
		style={{
			width: 600,
			border: '1px solid purple',
			display: 'flex',
			margin: '0 auto',
		}}
	>
		<Table />
	</div>,
	document.getElementById('root'),
);
