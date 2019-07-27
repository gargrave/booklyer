```jsx
const { InputType } = require('../Input.types.ts')

const formWrapperStyles = {
  border: `1px solid #ddd`,
  padding: 16,
  margin: 'auto',
  maxWidth: 600,
}

const loginFormFields = [
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
]

const authorFormFields = [
  {
    label: 'First Name',
    name: 'firstName',
    required: true,
    type: InputType.text,
  },
  {
    label: 'Last Name',
    name: 'lastName',
    type: InputType.text,
  },
]

const authorValue = { firstName: 'Kurt', lastName: 'Vonnegut' }

const ManagedFormHarness = () => {
  const onSubmit = payload => {
    console.log({ payload })
  }

  return (
    <>
      <ManagedForm fields={loginFormFields} onSubmit={onSubmit}>
        <p>child</p>
      </ManagedForm>
      <hr />

      <p>With pre-populated value:</p>
      <ManagedForm
        fields={authorFormFields}
        onSubmit={onSubmit}
        initialValue={authorValue}
      >
        <p>child</p>
      </ManagedForm>
    </>
  )
}

;<>
  <div style={formWrapperStyles}>
    <ManagedFormHarness />
  </div>
</>
```
