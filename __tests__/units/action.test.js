import {
	createTable,
	createCell,
	createRow,
	insertColumn,
	insertRow,
	removeColumn,
	removeRow,
} from '../../src/utils/actions';

const cellStub = expect.objectContaining({
	$index: expect.any(String),
	isFocused: expect.any(Boolean),
});

const makeRowStub = (cellsCount, isHeader) => {
	const cells = Array(cellsCount).fill(cellStub);

	return expect.objectContaining({
		$index: expect.any(String),
		isHeader: !!isHeader,
		cells,
	});
};

describe('#action', () => {
	describe('>createCell', () => {
		const testTable = [
			{
				name: 'should create cell',
				input: {},
				expected: cellStub,
			},
			{
				name: 'should create focused cell',
				input: { isFocused: true },
				expected: expect.objectContaining({
					$index: expect.any(String),
					isFocused: true,
				}),
			},
		];

		testTable.forEach(({ name, input, expected }) => {
			test(name, () => {
				expect(createCell(input).toJS()).toEqual(expected);
			});
		});
	});

	describe('>createRow', () => {
		const testTable = [
			{
				name: 'should create row',
				input: { cols: 1 },
				expected: makeRowStub(1),
			},
			{
				name: 'should create header row',
				input: { cols: 1, isHeader: true },
				expected: makeRowStub(1, true),
			},
			{
				name: 'should create non-header row',
				input: { cols: 10 },
				expected: makeRowStub(10, false),
			},
		];

		testTable.forEach(({ name, input, expected }) => {
			test(name, () => {
				expect(createRow(input).toJS()).toEqual(expected);
			});
		});
	});

	describe('>createTable', () => {
		const testTable = [
			{
				name: 'should create 3x3 table',
				input: { cols: 3, rows: 3 },
				expected: {
					rows: [makeRowStub(3, true), makeRowStub(3), makeRowStub(3)],
				},
			},
			{
				name: 'should create default 2x2 table',
				input: undefined,
				expected: {
					rows: [makeRowStub(2, true), makeRowStub(2)],
				},
			},
			{
				name: 'should create 5x7 table',
				input: { cols: 5, rows: 7 },
				expected: {
					rows: [
						makeRowStub(5, true),
						makeRowStub(5),
						makeRowStub(5),
						makeRowStub(5),
						makeRowStub(5),
						makeRowStub(5),
						makeRowStub(5),
					],
				},
			},
		];

		testTable.forEach(({ input, expected, name }) => {
			test(name, () => {
				expect(createTable(input).toJS()).toEqual(expected);
			});
		});

		test('should not create table less than 1 cell', () => {
			expect(() => createTable({ cols: 0, rows: 0 })).toThrow();
		});
	});

	describe('>insertRow', () => {
		test('should insert new row in the end', () => {
			let table = createTable();
			table = insertRow(table);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(2, true), makeRowStub(2), makeRowStub(2)],
			});
		});

		test('should insert new row after current element', () => {
			let table = createTable();

			table = insertRow(table, 1);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(2, true), makeRowStub(2), makeRowStub(2)],
			});

			table = insertRow(table, 0);

			expect(table.toJS()).toEqual({
				rows: [
					makeRowStub(2, true),
					makeRowStub(2),
					makeRowStub(2),
					makeRowStub(2),
				],
			});
		});
	});

	describe('>insertColumn', () => {
		test('should insert new column in the end', () => {
			let table = createTable();
			table = insertColumn(table);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(3, true), makeRowStub(3)],
			});

			table = insertColumn(table);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(4, true), makeRowStub(4)],
			});
		});

		test('should insert new row after current element', () => {
			let table = createTable();

			table = insertColumn(table, 1);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(3, true), makeRowStub(3)],
			});

			table = insertColumn(table, 0);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(4, true), makeRowStub(4)],
			});
		});
	});

	describe('>removeNewRow', () => {
		test('should remove row from table', () => {
			let table = createTable({ rows: 5 });
			table = removeRow(table, 3);
			table = removeRow(table, 3);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(2, true), makeRowStub(2), makeRowStub(2)],
			});
		});

		test('should remove first row properly', () => {
			let table = createTable({ rows: 5 });

			table = removeRow(table, 1);

			expect(table.toJS()).toEqual({
				rows: [
					makeRowStub(2, true),
					makeRowStub(2),
					makeRowStub(2),
					makeRowStub(2),
				],
			});

			table = removeRow(table, 0);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(2, true), makeRowStub(2), makeRowStub(2)],
			});
		});

		test('should not remove last row', () => {
			let table = createTable();
			table = removeRow(table, 0);
			table = removeRow(table, 0);
			table = removeRow(table, 0);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(2, true)],
			});
		});
	});

	describe('>removeColumn', () => {
		test('should remove column from table', () => {
			let table = createTable({ cols: 5 });
			table = removeColumn(table, 3);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(4, true), makeRowStub(4)],
			});

			table = removeColumn(table, 2);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(3, true), makeRowStub(3)],
			});
		});

		test('should not remove last column', () => {
			let table = createTable();
			table = removeColumn(table, 0);
			table = removeColumn(table, 0);
			table = removeColumn(table, 0);

			expect(table.toJS()).toEqual({
				rows: [makeRowStub(1, true), makeRowStub(1)],
			});
		});
	});
});
