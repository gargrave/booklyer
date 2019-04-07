```js
const { CardSpacerSize } = require('./CardSpacer')

;<>
  <Card>
    <Card.TextLine text="Below this line is a small-size CardSpacer." />
    <CardSpacer size={CardSpacerSize.Small} />
    <Card.TextLine text="Below this line is a medium-size CardSpacer." />
    <CardSpacer size={CardSpacerSize.Medium} />
    <Card.TextLine text="Below this line is a large-size CardSpacer." />
    <CardSpacer size={CardSpacerSize.Large} />
    <Card.TextLine text="No more CardSpacer sizes. That's it!" />
  </Card>
</>
```
