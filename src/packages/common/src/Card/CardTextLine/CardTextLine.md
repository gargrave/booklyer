```js
const { CardTextLineType } = require('./CardTextLine')

;<>
  <Card>
    <Card.TextLine
      text="This is the 'Title' TextLine type."
      type={CardTextLineType.Title}
    />
    <Card.TextLine text="This is the 'Text' TextLine type. (Default)" />
    <Card.TextLine
      text="This is the 'Subtext' TextLine type."
      type={CardTextLineType.Subtext}
    />
  </Card>
</>
```
