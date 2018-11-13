// doczrc.js
import { css } from 'docz-plugin-css'

export default {
  title: 'orbit-client',
  description: 'An expressive Reactjs client for the Orbitjs framework',
  src: '.docz/docs',
  wrapper: '.docz/wrapper',
  plugins: [
    css({
      preprocessor: 'postcss',
      cssmodules: true,
    })
  ]
}
