import { Map, List } from 'immutable';
import sId from 'shortid';

/**
 * @description Creates Immutable cell object
 * @param {Object} [options = {}]
 * @param {boolean} [options.isFocused = false] is cell focused
 * @returns {Immutable.Map}
 */
export const createCell = ({ isFocused = false } = {}) => {
	const cell = new Map({
		isFocused,
		$index: sId.generate(),
	});

	return cell;
};

/**
 * @description Creates Immutable row with cell
 * @param {Object} [options = {}]
 * @param {number} [options.cols = 2] number of cols in row
 * @param {boolean} [options.isHeader = false] need to create table's header
 * @returns {Immutable.List}
 */
export const createRow = ({ cols = 2, isHeader = false } = {}) => {
	const cells = new List(
		Array(cols)
			.fill()
			.map(createCell),
	);

	const row = new Map({
		isHeader,
		cells,
		$index: sId.generate(),
	});

	return row;
};

/**
 * @description Create immutable table
 * @param {Object} [options]
 * @param {number} [options.cols = 2]
 * @param {number} [options.rows = 2]
 * @returns {Immutable.Map}
 */
export const createTable = ({ cols = 2, rows = 2 } = {}) => {
	if (cols < 1 || rows < 1) {
		throw new Error('Cannot create table less than 1 cell');
	}

	const rowsElements = new List(
		Array(rows)
			.fill()
			.map((_, k) => createRow({ cols, isHeader: k === 0 })),
	);
	const tableData = new Map({
		rows: rowsElements,
	});

	return tableData;
};

/**
 * @description Create and insert empty row in table
 * @param {Immutable.Map} tableData
 * @param {number} [index = null] previous row index
 * @returns {Immutable.Map}
 */
export const insertRow = (tableData, index = null) => {
	let rows = tableData.get('rows');
	const firstRowSize = rows.get(0).get('cells').size;
	let newRow = createRow({ cols: firstRowSize });

	if (typeof index === 'number') {
		if (index === 0) {
			const firstRow = rows.get(0);
			rows = rows.set(0, firstRow.set('isHeader', false));
			newRow = newRow.set('isHeader', true);
		}

		rows = rows.insert(index, newRow);
	} else {
		rows = rows.push(newRow);
	}

	return tableData.set('rows', rows);
};

/**
 * @description Create and insert empty column in table
 * @param {Immutable.Map} tableData
 * @param {numbe} [index = null] previous column index
 * @returns {Immutable.Map}
 */
export const insertColumn = (tableData, index = null) => {
	let rows = tableData.get('rows');
	rows = rows.map((row) => {
		let cells = row.get('cells');

		if (typeof index === 'number') {
			cells = cells.insert(index, createCell());
		} else {
			cells = cells.push(createCell());
		}

		return row.set('cells', cells);
	});

	return tableData.set('rows', rows);
};

/**
 * @description Remove row from table by `index`
 * @param {Immutable.Map} tableData
 * @param {number} index
 * @returns {Immutable.Map}
 */
export const removeRow = (tableData, index) => {
	let rows = tableData.get('rows');
	const { size } = rows;

	if (size === 1 || typeof index !== 'number') {
		// Minimal table's size is 1
		return tableData;
	}

	rows = rows.delete(index);
	const firstRow = rows.get(0);

	if (!firstRow.get('isHeader')) {
		rows = rows.set(0, firstRow.set('isHeader', true));
	}

	return tableData.set('rows', rows);
};

/**
 * @description Remove column from table by `index`
 * @param {Immutable.Map} tableData
 * @param {number} index
 * @returns {Immutable.Map}
 */
export const removeColumn = (tableData, index) => {
	let rows = tableData.get('rows');

	rows = rows.map((row) => {
		const cells = row.get('cells');
		const { size } = cells;

		if (size === 1 || typeof index !== 'number') {
			// Minimal table's size is 1
			return row;
		}

		return row.set('cells', cells.delete(index));
	});

	return tableData.set('rows', rows);
};
