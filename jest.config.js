// Mocking the css modules resolution during test so Jest won't try to 'compile' css modules as js modules
module.exports = {
  moduleNameMapper: {
    '\\.css$': require.resolve('./test/style-mock.js'),
  }
}