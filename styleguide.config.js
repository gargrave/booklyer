/* eslint-disable sort-keys */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const componentList = (componentNames, path = 'app') =>
  componentNames.map(name => `src/${path}/**/${name}.tsx`)

module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json',
    [{}],
  ).parse,

  require: [path.join(__dirname, 'src/app/core/App.scss')],

  sections: [
    {
      name: 'Common Components',
      components: componentList(
        ['Alert', 'Button', 'Card', 'InputField', 'ManagedForm', 'Select'],
        'packages/common',
      ),
    },
  ],

  webpackConfig: require('./config/webpack.config.dev.js'),
}
