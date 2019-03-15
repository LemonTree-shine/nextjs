const withLess = require('@zeit/next-less')

module.exports = {
    distDir: '/dist',
    ...withLess()
}