```js
const { address, internet, name } = require('faker')

const textList = [
  {
    title: 'Name',
    text: `${name.firstName()} ${name.lastName()}`,
  },
  {
    title: 'Occupation',
    text: name.jobType(),
  },
  {
    title: 'Email',
    text: internet.email(),
  },
  {
    title: 'Hometown',
    text: address.city(),
  },
  {
    text: 'This line has no `title` property',
  },
]

;<>
  <Card>
    <Card.TextList textList={textList} />
  </Card>
</>
```
