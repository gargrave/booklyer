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
      sections: [
        {
          name: 'Misc',
          components: componentList(['Alert', 'Button']),
        },
        {
          name: 'Card',
          components: componentList([
            'Card',
            'CardHeader',
            'CardSpacer',
            'CardTextLine',
            'CardTextList',
          ]),
        },
        {
          name: 'Forms',
          components: componentList(['Form', 'InputField', 'ManagedForm']),
        },
      ],
    },
    {
      name: 'Booklyer',
      components: componentList(['BookCard']),
    },
  ],

  webpackConfig: require('./config/webpack.config.dev.js'),
}
