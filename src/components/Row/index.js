import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { ThemeProvider } from 'emotion-theming';

const RowContainer = styled.div`
	display: flex;
	flex-direction: row;
	box-sizing: border-box;

	min-height: ${(props) => props.theme.minRowHeight};
	border: ${(props) => props.theme.borderSize} solid
		${(props) => props.theme.borderColor};
	font-weight: ${(props) => (props.isHeader ? 'bold' : 'normal')};

	border-right: 0;
	border-left: 0;
	border-bottom: 0;

	:last-child {
		border-bottom: ${(props) => props.theme.borderSize} solid
			${(props) => props.theme.borderColor};
	}
`;

const Row = (props) => {
	const { isHeader = false, children } = props;

	return (
		<ThemeProvider theme={(theme = {}) => theme.row}>
			<RowContainer isHeader={isHeader}>{children}</RowContainer>
		</ThemeProvider>
	);
};

Row.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	isHeader: PropTypes.bool,
};

Row.defaultProps = {
	children: null,
	isHeader: false,
};

export default Row;
