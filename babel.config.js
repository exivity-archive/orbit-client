module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        modules: false
      }
    ],
    '@babel/preset-react'
  ],
  env: {
    test: {
      presets: [
        '@babel/preset-env',
        '@babel/preset-react'
      ]
    }
  },
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-class-properties',
    'babel-plugin-styled-components'
  ]
}
