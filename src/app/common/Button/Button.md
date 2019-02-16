```js
const { ButtonType } = require('./Button')

;<>
  <div>
    <p>Basic Buttons</p>
    <Button>Default</Button>
    <Button type={ButtonType.Secondary}>Secondary</Button>
    <Button type={ButtonType.Success}>Success</Button>
    <Button type={ButtonType.Info}>Info</Button>
    <Button type={ButtonType.Warning}>Warning</Button>
    <Button type={ButtonType.Danger}>Danger</Button>
    <Button type={ButtonType.Dark}>Dark</Button>
    <Button type={ButtonType.Light}>Light</Button>
    <Button type={ButtonType.Link}>Link</Button>
  </div>

  <div>
    <p>Block Button</p>
    <Button block={true}>Block!</Button>
  </div>

  <div>
    <p>Loader</p>
    <Button loading={true}>Loading</Button>
  </div>

  <div>
    <p>Disabled</p>
    <Button disabled={true}>Disabled</Button>
  </div>
</>
```
