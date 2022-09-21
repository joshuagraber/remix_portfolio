import autoprefixer from 'autoprefixer';

module.exports = {
	plugins: {
		autoprefixer: autoprefixer({
			browsers: ['last 4 versions', 'Firefox ESR', 'iOS >= 8', 'not dead', '<.2%'],
		}),
	},
};
