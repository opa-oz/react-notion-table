import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles.scss';

const Table = (props) => {
	const { className = null } = props;

	return (
		<div
			className={classNames({
				[styles.Table]: true,
				[className]: !!className,
			})}
		>
			Table will be here or NOT?
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
