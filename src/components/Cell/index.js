import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

const CellContainer = styled.div`
	display: table-cell;
	box-sizing: border-box;
	position: relative;

	border-right: ${(props) => props.theme.borderSize} solid
		${(props) => props.theme.borderColor};
	padding: ${(props) => props.theme.cellPadding};
	min-width: ${(props) => props.theme.minCellWidth};
	width: ${(props) => props.maxWidth || 'auto'};

	:last-child {
		border-right: 0;
	}
`;

const Cell = (props) => {
	const { children, maxWidth } = props;

	return (
		<ThemeProvider theme={(theme = {}) => theme.cell}>
			<CellContainer maxWidth={maxWidth}>
				Cell
				{children}
			</CellContainer>
		</ThemeProvider>
	);
};

Cell.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Cell.defaultProps = {
	children: null,
	maxWidth: 'auto',
};

export default Cell;
