
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emails-input.cjs.production.min.js')
} else {
  module.exports = require('./emails-input.cjs.development.js')
}
