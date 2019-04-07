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
      sections: [
        {
          name: 'Misc',
          components: componentList(['Alert', 'Button'], 'packages/common'),
        },
        {
          name: 'Card',
          components: componentList(
            [
              'Card',
              'CardHeader',
              'CardSpacer',
              'CardTextLine',
              'CardTextList',
            ],
            'packages/common',
          ),
        },
        {
          name: 'Forms',
          components: componentList(
            ['InputField', 'ManagedForm', 'Select'],
            'packages/common',
          ),
        },
      ],
    },
    {
      name: 'Booklyer',
      components: componentList(['SimpleBookCard']),
    },
  ],

  webpackConfig: require('./config/webpack.config.dev.js'),
}
