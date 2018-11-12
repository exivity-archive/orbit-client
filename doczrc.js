// doczrc.js
export default {
  title: 'orbit-client',
  description: 'An expressive Reactjs client for the Orbitjs framework',
  src: '.docz/docs',
  wrapper: '.docz/wrapper',
  modifyBundlerConfig: (config) => {
   config.resolve.extensions.push('.css')
   config.module.rules.push({
     test: /\.css$/,
     use: ["style-loader", "css-loader", "sass-loader"]
   })

   return config
 }
}
