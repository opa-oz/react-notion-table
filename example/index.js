import React from 'react';
import ReactDOM from 'react-dom';

import { Table } from '../src';

ReactDOM.render(
	<div
		style={{
			width: 600,
			display: 'flex',
			flexDirection: 'column',
			margin: '0 auto',
		}}
	>
		<>
			<h1>Editable table</h1>
			<Table isEditable />
			<br />
			<h1>Read-only table</h1>
			<br />
			<Table />
		</>
	</div>,
	document.getElementById('root'),
);
