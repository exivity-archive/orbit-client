module.exports = {
  options: {
    root: __dirname,
  },
  use: [
    '@neutrinojs/standardjs',
    [
      '@neutrinojs/library',
      {
        name: 'proton2'
      }
    ],
    '@neutrinojs/jest'
  ]
};
