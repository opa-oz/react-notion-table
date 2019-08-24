// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,

	// An array of glob patterns indicating a set of files for which
	// coverage information should be collected
	collectCoverageFrom: ['src/**/*.js'],

	// The directory where Jest should output its coverage files
	coverageDirectory: 'coverage',

	// An array of regexp pattern strings used to skip coverage collection
	coveragePathIgnorePatterns: [
		'/node_modules/',
		'/dist/',
		'/.cache/',
		'/example/',
	],

	// Activates notifications for test results
	notify: true,

	// A list of paths to directories that Jest should use to search for files in
	roots: ['<rootDir>/__tests__'],

	// An array of regexp pattern strings that are matched against all test paths,
	// matched tests are skipped
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],

	moduleNameMapper: {
		'\\.(css|less|scss|sss|styl)$': 'jest-css-modules',
	},

	// A map from regular expressions to paths to transformers
	transform: {
		'.+\\.(png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
		'^.+\\.js$': 'babel-jest',
	},

	// An array of regexp pattern strings that are matched against all source file paths,
	// matched files will skip transformation
	transformIgnorePatterns: ['/node_modules/'],
};
