import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

const CellContainer = styled.div`
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	width: 50%;

	border-right: ${(props) => props.theme.borderSize} solid
		${(props) => props.theme.borderColor};
	padding: ${(props) => props.theme.cellPadding};
	min-width: ${(props) => props.theme.minCellWidth};

	:last-child {
		border-right: 0;
	}
`;

const Cell = () => (
	<ThemeProvider theme={(theme = {}) => theme.cell}>
		<CellContainer>Cell</CellContainer>
	</ThemeProvider>
);

Cell.propTypes = {};

Cell.defaultProps = {};

export default Cell;
