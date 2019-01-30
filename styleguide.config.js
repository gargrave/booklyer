const path = require('path')

const componentList = componentNames =>
  componentNames.map(name => `src/app/**/${name}.tsx`)

module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json',
    [{}],
  ).parse,

  require: [path.join(__dirname, 'src/app/core/App.scss')],

  sections: [
    {
      name: 'Common Components',
      components: componentList(['Button']),
    },
  ],

  webpackConfig: require('./config/webpack.config.dev.js'),
}
