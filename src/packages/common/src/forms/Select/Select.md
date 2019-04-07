```jsx
const { mockAuthors } = require('utils/mocks/static/authors')

const SelectHarness = () => {
  const [value1, setValue1] = React.useState(null)
  const [value2, setValue2] = React.useState(mockAuthors[1])

  function handleChange1(event) {
    setValue1(event.target.value)
  }

  function handleChange2(event) {
    setValue2(event.target.value)
  }

  return (
    <>
      <p>No pre-value value:</p>
      <Select
        getOptionText={author => `${author.firstName} ${author.lastName}`}
        getOptionValue={author => author.id}
        label="Author"
        name="author-select"
        onChange={handleChange1}
        options={mockAuthors}
        placeholder="Select an Author..."
        value={value1}
      />
      <hr />

      <p>With pre-value value:</p>
      <Select
        getOptionText={author => `${author.firstName} ${author.lastName}`}
        getOptionValue={author => author.id}
        label="Author"
        name="author-select"
        onChange={handleChange2}
        options={mockAuthors}
        placeholder="Select an Author..."
        value={value2}
      />
      <hr />

      <p>A disabled Select field:</p>
      <Select
        disabled={true}
        getOptionText={author => `${author.firstName} ${author.lastName}`}
        getOptionValue={author => author.id}
        label="Author"
        name="author-select"
        onChange={handleChange2}
        options={mockAuthors}
        placeholder="Select an Author..."
        value={value2}
      />
    </>
  )
}

;<>
  <SelectHarness />
</>
```
