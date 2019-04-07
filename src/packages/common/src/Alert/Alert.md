```jsx
const { AlertType } = require('./Alert')

;<>
  <p>Basic types:</p>
  <Alert message="This is a 'danger' Alert" type={AlertType.danger} />
  <Alert message="This is a 'dark' Alert" type={AlertType.dark} />
  <Alert message="This is a 'info' Alert" type={AlertType.info} />
  <Alert message="This is a 'light' Alert" type={AlertType.light} />
  <Alert message="This is a 'primary' Alert" type={AlertType.primary} />
  <Alert message="This is a 'secondary' Alert" type={AlertType.secondary} />
  <Alert message="This is a 'success' Alert" type={AlertType.success} />
  <Alert message="This is a 'warning' Alert" type={AlertType.warning} />
  <hr />

  <p>Additional children:</p>
  <Alert
    message="You can add arbitrary additional children if you really feel the need. Cool!"
    type={AlertType.primary}
  >
    <hr />
    <p>This is a paragraph!</p>
    <ul>
      <li>
        <strong>Where is:</strong>
      </li>
      <ul>
        <li>My coffee</li>
        <li>Where is it</li>
      </ul>
    </ul>
  </Alert>
</>
```
