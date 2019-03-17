```jsx
const { InputType } = require('../forms.types')

;<>
  <InputField
    label="A basic text input field"
    name="inputField-example-1"
    placeholder="Give me some text!"
  />

  <InputField
    error="Psst, this is an error message..."
    label="A text field with a validation error"
    name="inputField-example-2"
    placeholder="Something is amiss!"
  />

  <InputField
    label="A password field"
    name="inputField-example-3"
    type={InputType.password}
  />

  <InputField
    disabled={true}
    label="A disabled field"
    name="inputField-example-4"
    type={InputType.text}
    value="Yo, you can't edit this value"
  />
</>
```
