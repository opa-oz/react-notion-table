import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Cell from '../Cell';
import Row from '../Row';

import { createTable, insertRow, insertColumn } from '../../utils/actions';

import styles from './styles.scss';

const DEFAULT_SIZES = { cols: 2, rows: 2 };
const DEFAULT_TABLE = createTable(DEFAULT_SIZES);

const Table = (props) => {
	const { className } = props;
	const [sizes, setSizes] = useState(DEFAULT_SIZES);
	const [tableData, setTableData] = useState(DEFAULT_TABLE);

	const handleInsertRow = (index) => {
		setTableData(insertRow(tableData, index));
		setSizes({ ...sizes, rows: sizes.rows + 1 });
	};

	const handleInsertColumn = (index) => {
		setTableData(insertColumn(tableData, index));
		setSizes({ ...sizes, cols: sizes.cols + 1 });
	};

	const makeRow = (row) => {
		const $index = row.get('$index');
		const isHeader = row.get('isHeader');
		const cells = row.get('cells');

		return (
			<Row isHeader={isHeader} key={$index}>
				{cells.map((cell) => (
					<Cell data={cell} key={cell.get('$index')} />
				))}
			</Row>
		);
	};

	const rows = tableData.get('rows');

	return (
		<div
			className={classNames({
				[styles.TableContainer]: true,
				[className]: !!className,
			})}
		>
			<div className={styles.Table}>
				{rows.map(makeRow)}
				<button type="button" id="insertRow" onClick={() => handleInsertRow()}>
					Insert Row
				</button>
				<button
					type="button"
					id="insertColumn"
					onClick={() => handleInsertColumn()}
				>
					Insert Column
				</button>
			</div>
		</div>
	);
};

Table.propTypes = {
	className: PropTypes.string,
};

Table.defaultProps = {
	className: null,
};

export default Table;
