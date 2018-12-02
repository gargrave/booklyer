import * as React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'

import Router from './Router'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <>
          <h1>Booklyer</h1>
          <nav>
            <Link to="/books">Books</Link> | <Link to="/authors">Authors</Link>
          </nav>
          <main>
            <Router />
          </main>
        </>
      </BrowserRouter>
    )
  }
}

export default App
