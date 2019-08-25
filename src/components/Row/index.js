import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Row = (props) => {
	const { className, isHeader = false, children } = props;

	return (
		<div
			className={classNames({
				[styles.Row]: true,
				[styles.Header]: isHeader,
				[className]: !!className,
			})}
		>
			{children}
		</div>
	);
};

Row.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	className: PropTypes.string,
	isHeader: PropTypes.bool,
};

Row.defaultProps = {
	children: null,
	className: null,
	isHeader: false,
};

export default Row;
