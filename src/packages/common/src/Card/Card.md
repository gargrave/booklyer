```js
import {
  Card,
  CardHeader,
  CardSpacer,
  CardSpacerSize,
  CardTextLine,
  CardTextLineType,
} from '.'

const sectionStyle = {
  margin: 'auto',
  maxWidth: 800,
  width: '100%',
}

;<>
  <h4 style={sectionStyle}>A full example:</h4>
  <Card>
    <CardHeader text="OMG Amazing News!" />
    <CardSpacer />
    <CardTextLine text="Something happened today, and you must know about it!" />
    <CardTextLine text="This is a basic card with a Header and a couple TextLines." />
  </Card>

  <h4 style={sectionStyle}>Hoverable:</h4>
  <Card hoverable={true}>
    <CardTextLine text="This card is hoverable. Hover over it!" />
  </Card>

  <h4 style={sectionStyle}>CardHeader:</h4>
  <Card>
    <CardHeader text="This is just the CardHeader component!" />
  </Card>

  <h4 style={sectionStyle}>CardSpacer:</h4>
  <Card>
    <CardTextLine text="Below this line is a small-size CardSpacer." />
    <CardSpacer size={CardSpacerSize.Small} />
    <CardTextLine text="Below this line is a medium-size CardSpacer." />
    <CardSpacer size={CardSpacerSize.Medium} />
    <CardTextLine text="Below this line is a large-size CardSpacer." />
    <CardSpacer size={CardSpacerSize.Large} />
    <CardTextLine text="No more CardSpacer sizes. That's it!" />
  </Card>

  <h4 style={sectionStyle}>CardTextLine:</h4>
  <Card>
    <CardTextLine
      text="This is the 'Title' TextLine type."
      type={CardTextLineType.Title}
    />
    <CardTextLine text="This is the 'Text' TextLine type. (Default)" />
    <CardTextLine
      text="This is the 'Subtext' TextLine type."
      type={CardTextLineType.Subtext}
    />
  </Card>
</>
```
