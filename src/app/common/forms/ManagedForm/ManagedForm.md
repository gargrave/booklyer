```jsx
const { InputType } = require('../InputField/InputField')

const formWrapperStyles = {
  border: `1px solid #ddd`,
  padding: 16,
  margin: 'auto',
  maxWidth: 600,
}

const formSettings = {
  fields: [
    {
      label: 'Username',
      name: 'username',
      required: true,
      type: InputType.text,
      validations: {
        minLength: 8,
      },
    },
    {
      label: 'Password',
      name: 'password',
      required: true,
      type: InputType.password,
      validations: {
        minLength: 8,
      },
    },
  ],
}

const ManagedFormHarness = () => {
  const { fields } = formSettings

  const onSubmit = payload => {
    console.log({ payload })
  }

  return (
    <ManagedForm fields={fields} onSubmit={onSubmit}>
      <p>child</p>
    </ManagedForm>
  )
}

;<>
  <div style={formWrapperStyles}>
    <ManagedFormHarness />
  </div>
</>
```
