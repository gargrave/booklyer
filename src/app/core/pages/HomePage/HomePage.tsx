import * as React from 'react'

import { Author } from 'app/authors/authors.types'
import { Book } from 'app/books/books.types'
import { AppContext } from '../../AppIndex/App.context'
import { BasicRouteProps } from '../../core.types'

import { Button, ButtonRow, ButtonType } from 'packages/common'

import styles from './HomePage.module.scss'

const NonAuthenticatedContent = ({ history }) => (
  <>
    <p>
      Login to your account to get started with <em>the</em> cutting-edge,
      synergysitcally innovative, next-gen, totally web scale, SEO-enhanced,
      blockchain-in-the-cloud-powered, authors and books tracker!
    </p>

    <ButtonRow styleOverride={{ justifyContent: 'center' }}>
      <Button
        type={ButtonType.Success}
        onClick={() => history.push('/account/login')}
      >
        Login
      </Button>
      <Button onClick={() => history.push('/account/register')}>
        Register
      </Button>
    </ButtonRow>
  </>
)

const AuthenticatedContent = ({ getAuthors, getBooks, user }) => {
  const authorsCount = getAuthors().length
  const booksCount = getBooks().length
  return (
    <div>
      <div className={styles.subTitle}>
        You are logged in as <strong>{user.email}</strong>.
      </div>
      <div>Here are some stats on your current usage:</div>
      <div>Authors: {authorsCount}</div>
      <div>Books: {booksCount}</div>
    </div>
  )
}

export type HomePageProps = {
  getAuthors: () => Author[]
  getBooks: () => Book[]
} & BasicRouteProps

export const HomePage: React.FunctionComponent<HomePageProps> = props => {
  const { appInitialized, user } = React.useContext(AppContext)
  return (
    <div className={styles.contentWrapper}>
      <h2 className={styles.title}>Bookly</h2>
      {appInitialized ? (
        user ? (
          <AuthenticatedContent {...props} user={user} />
        ) : (
          <NonAuthenticatedContent {...props} />
        )
      ) : (
        <div>Initializing...</div>
      )}
    </div>
  )
}
