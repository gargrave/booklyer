```js
const { ButtonType } = require('./Button')

;<>
  <p>
    <div>Basic Buttons</div>
    <Button>Default</Button>
    <Button type={ButtonType.Secondary}>Secondary</Button>
    <Button type={ButtonType.Success}>Success</Button>
    <Button type={ButtonType.Info}>Info</Button>
    <Button type={ButtonType.Warning}>Warning</Button>
    <Button type={ButtonType.Danger}>Danger</Button>
    <Button type={ButtonType.Dark}>Dark</Button>
    <Button type={ButtonType.Light}>Light</Button>
    <Button type={ButtonType.Link}>Link</Button>
  </p>

  <p>
    <div>Block Button</div>
    <Button block={true}>Block!</Button>
  </p>

  <p>
    <div>Loader</div>
    <Button loading={true}>Loading</Button>
  </p>

  <p>
    <div>Disabled</div>
    <Button disabled={true}>Disabled</Button>
  </p>
</>
```
