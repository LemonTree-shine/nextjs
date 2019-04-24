const withLess = require('@zeit/next-less');

if (typeof require !== 'undefined') {
    require.extensions['.less'] = (file) => {}
  }

module.exports = {
    distDir: '/dist',
    ...withLess({
        lessLoaderOptions: {
            javascriptEnabled: true,
        },
    })
    
}