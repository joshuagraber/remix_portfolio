import autoprefixer from 'autoprefixer';

module.exports = {
	plugins: {
		autoprefixer: autoprefixer({ browsers: ['last 4 versions', 'iOS >= 8', 'not dead', '<.2%'] }),
	},
};
