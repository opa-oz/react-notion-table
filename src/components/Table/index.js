import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { MdAdd } from 'react-icons/md';

import Cell from '../Cell';
import Row from '../Row';

import defaultTheme from '../theme/default-theme';

import { createTable, insertRow, insertColumn } from '../../utils/actions';

const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	overflow: auto;
	position: relative;

	padding-bottom: ${(props) => (props.isEditable ? props.theme.buttons.rowHeight : 0)};
	padding-right: ${(props) => (props.isEditable ? props.theme.buttons.colWidth : 0)};
`;

const TableBlock = styled.div`
	display: flex;
	flex-direction: column;
`;

const InsertRowButton = styled.div`
	box-sizing: border-box;
	display: flex;
	position: absolute;
	bottom: 0;
	left: 0;
	right: ${(props) => props.theme.buttons.colWidth};
	align-items: center;
	background: transparent;
	padding: 5px;
	transition: background-color 0.3s linear;
	cursor: pointer;

	height: ${(props) => props.theme.buttons.rowHeight};

	:hover {
		background-color: ${(props) => props.theme.buttons.hoverColor};
	}
`;

const InsertColumnButton = styled(InsertRowButton)`
	left: auto;
	top: 0;
	right: 0;
	bottom: ${(props) => props.theme.buttons.rowHeight};
	align-items: flex-start;
	justify-content: space-around;
	height: auto;

	width: ${(props) => props.theme.buttons.colWidth};
`;

const PlusIcon = styled(MdAdd)`
	display: flex;
	transition: color 0.3s linear;

	font-size: ${(props) => props.theme.buttons.plusSize};
	height: ${(props) => props.theme.buttons.plusSize};
	width: ${(props) => props.theme.buttons.plusSize};
	color: ${(props) => props.theme.buttons.plusColor};

	${InsertRowButton}:hover & {
		color: ${(props) => props.theme.buttons.plusHoverColor};
	}
`;

const DEFAULT_SIZES = { cols: 3, rows: 2 };
const DEFAULT_TABLE = createTable(DEFAULT_SIZES);

const Table = (props) => {
	const { theme, isEditable = false } = props;
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
		<ThemeProvider theme={theme}>
			<TableContainer isEditable={isEditable}>
				<TableBlock>{rows.map(makeRow)}</TableBlock>
				{isEditable ? (
					<>
						<InsertRowButton onClick={() => handleInsertRow()}>
							<PlusIcon />
						</InsertRowButton>
						<InsertColumnButton onClick={() => handleInsertColumn()}>
							<PlusIcon />
						</InsertColumnButton>
					</>
				) : null}
			</TableContainer>
		</ThemeProvider>
	);
};

Table.propTypes = {
	// eslint-disable-next-line react/forbid-prop-types
	theme: PropTypes.object,
	isEditable: PropTypes.bool,
};

Table.defaultProps = {
	theme: defaultTheme,
	isEditable: false,
};

export default Table;
