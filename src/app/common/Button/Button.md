```js
const { ButtonType } = require('./Button')

const handleClick = () => {
  console.log('Button clicked!')
}

;<>
  <div>
    <p>Basic Buttons</p>
    <Button onClick={handleClick}>Default</Button>
    <Button onClick={handleClick} type={ButtonType.Secondary}>
      Secondary
    </Button>
    <Button onClick={handleClick} type={ButtonType.Success}>
      Success
    </Button>
    <Button onClick={handleClick} type={ButtonType.Info}>
      Info
    </Button>
    <Button onClick={handleClick} type={ButtonType.Warning}>
      Warning
    </Button>
    <Button onClick={handleClick} type={ButtonType.Danger}>
      Danger
    </Button>
    <Button onClick={handleClick} type={ButtonType.Dark}>
      Dark
    </Button>
    <Button onClick={handleClick} type={ButtonType.Light}>
      Light
    </Button>
    <Button onClick={handleClick} type={ButtonType.Link}>
      Link
    </Button>
  </div>

  <div>
    <p>Block Button</p>
    <Button block={true} onClick={handleClick}>
      Block!
    </Button>
  </div>

  <div>
    <p>Loader</p>
    <Button loading={true} onClick={handleClick}>
      Loading
    </Button>
  </div>

  <div>
    <p>Disabled</p>
    <Button disabled={true} onClick={handleClick}>
      Disabled
    </Button>
  </div>

  <div>
    <p>Double-click to confirm</p>
    <Button onClick={handleClick} requireExtraClick={true}>
      I require an extra click!
    </Button>
  </div>
</>
```
