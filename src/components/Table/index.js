import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';
import { MdAdd } from 'react-icons/md';
import Draggable from 'react-draggable';

import Cell from '../Cell';
import Row from '../Row';

import { createTable, insertRow, insertColumn } from '../../utils/actions';

import defaultTheme from '../theme/default-theme';

const DEFAULT_STICK_HOVER = -1;

const TableContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	overflow: auto;
	position: relative;
`;

const TableBlock = styled.div`
	display: table;
	width: 100%;
	border-collapse: collapse;
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

const ButtonsContainer = styled(TableContainer)`
	display: flex;
	width: 100%;
	overflow: hidden;

	margin-right: -${(props) => (props.isEditable ? props.theme.buttons.colWidth : 0)};
	padding-bottom: ${(props) => (props.isEditable ? props.theme.buttons.rowHeight : 0)};
	padding-right: ${(props) => (props.isEditable ? props.theme.buttons.colWidth : 0)};
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

const ResizeStick = styled.div`
	display: block;
	position: absolute;
	width: 2px;
	top: -1px;
	bottom: -1px;
	right: -1.5px;
	left: auto;
	cursor: col-resize;
	z-index: 100;
	transform: none !important;
	border: 2px solid transparent;

	box-shadow: inset 2px 0
		${(props) => (props.hover ? props.theme.resizeStick.color : 'transparent')};
`;

const DEFAULT_SIZES = { cols: 3, rows: 2 };
const DEFAULT_TABLE = createTable(DEFAULT_SIZES);

const Table = (props) => {
	const { theme, isEditable = false } = props;
	const [sizes, setSizes] = useState(DEFAULT_SIZES);
	const [tableData, setTableData] = useState(DEFAULT_TABLE);
	const [customCellWidthes, setCustomCellWidthes] = useState(
		Array(DEFAULT_SIZES.cols).fill(),
	);
	const [hoverStickIndex, setHoverableStickIndex] = useState(
		DEFAULT_STICK_HOVER,
	);

	const rows = tableData.get('rows');

	const handleInsertRow = (index) => {
		setTableData(insertRow(tableData, index));
		setSizes({ ...sizes, rows: sizes.rows + 1 });
	};

	const handleInsertColumn = (index) => {
		setTableData(insertColumn(tableData, index));
		setSizes({ ...sizes, cols: sizes.cols + 1 });
	};

	const handleDrag = (index, ui) => {
		const { deltaX, node } = ui;
		const { width } = window.getComputedStyle(node.parentElement);
		const { minWidth: _minWidth } = window.getComputedStyle(node.parentElement);
		const minWidth = parseInt(_minWidth, 10);

		const newWidth = parseInt(width, 10) + deltaX;
		const newMaxWidth = newWidth < minWidth ? minWidth : newWidth;

		setCustomCellWidthes(
			customCellWidthes.map((v, k) => (k === index ? `${newMaxWidth}px` : v)),
		);
	};

	const makeRow = (row) => {
		const $index = row.get('$index');
		const isHeader = row.get('isHeader');
		const cells = row.get('cells');

		return (
			<Row isHeader={isHeader} key={$index}>
				{cells.map((cell, k) => (
					<Cell
						data={cell}
						key={cell.get('$index')}
						maxWidth={customCellWidthes[k]}
					>
						<Draggable axis="x" onDrag={(_, ui) => handleDrag(k, ui)}>
							<ResizeStick
								hover={hoverStickIndex === k}
								onMouseOver={() => setHoverableStickIndex(k)}
								onMouseLeave={() => setHoverableStickIndex(DEFAULT_STICK_HOVER)}
								onFocus={() => setHoverableStickIndex(k)}
								onBlur={() => setHoverableStickIndex(DEFAULT_STICK_HOVER)}
							/>
						</Draggable>
					</Cell>
				))}
			</Row>
		);
	};

	return (
		<ThemeProvider theme={theme}>
			<ButtonsContainer isEditable={isEditable}>
				<TableContainer>
					<TableBlock>{rows.map(makeRow)}</TableBlock>
				</TableContainer>
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
			</ButtonsContainer>
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
