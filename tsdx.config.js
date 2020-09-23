const postcss = require('rollup-plugin-postcss');

module.exports = {
  rollup(config) {
    config.plugins.push(
      postcss({
        modules: true,
      })
    );
    config.output = {
      file: 'dist/emails-input.js',
      format: 'umd',
      name: 'EmailsInput',
      sourcemap: true,
    };

    return config;
  },
};
