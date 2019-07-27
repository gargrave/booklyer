```jsx
const { InputType } = require('../Input.types')

const formWrapperStyles = {
  border: `1px solid #ddd`,
  padding: 16,
  margin: 'auto',
  maxWidth: 600,
}

const FormHarness = () => {
  const [user, setUser] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSubmit = event => {
    event.preventDefault()
    console.log('Submit Form!')
    console.log(user)
  }

  const onCancel = () => console.log('Cancel form!')

  const onInputChange = event => {
    const key = event.target.name
    if (key === 'user') {
      setUser(event.target.value)
    }
    if (key === 'password') {
      setPassword(event.target.value)
    }
  }

  return (
    <Form
      error="This is an optional error message."
      onCancel={onCancel}
      onSubmit={onSubmit}
      title="Example Login Form"
    >
      <InputField
        value={user}
        label="Username"
        onInputChange={onInputChange}
        name="user"
      />

      <InputField
        value={password}
        label="Password"
        onInputChange={onInputChange}
        name="password"
        type={InputType.Password}
      />
    </Form>
  )
}
;<>
  <p>Basic form (with additional wrapper styles for clarity):</p>
  <div style={formWrapperStyles}>
    <FormHarness />
  </div>
</>
```
