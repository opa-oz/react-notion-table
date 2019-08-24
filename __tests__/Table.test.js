import React from 'react';
import renderer from 'react-test-renderer';

import Table from '../src/components/Table';

describe('#Table', () => {
	test('should render properly', () => {
		const component = renderer.create(<Table />);

		const table = component.toJSON();

		expect(table).toMatchSnapshot();
	});

	test('should render with additional class', () => {
		const component = renderer.create(<Table className="AdditionalClass" />);

		const table = component.toJSON();

		expect(table).toMatchSnapshot();
	});
});
