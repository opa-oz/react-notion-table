import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import styles from './styles.scss';

const Cell = (props) => {
	const { className } = props;

	return (
		<div
			className={classNames({
				[styles.Cell]: true,
				[className]: !!className,
			})}
		>
			Cell
		</div>
	);
};

Cell.propTypes = {
	className: PropTypes.string,
};

Cell.defaultProps = {
	className: null,
};

export default Cell;
