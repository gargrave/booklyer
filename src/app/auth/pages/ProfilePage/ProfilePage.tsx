import * as React from 'react'

import { BasicRouteProps } from 'app/core/core.types'
import { AppContext } from 'app/core/AppIndex/App.context'

import Button from 'packages/common/src/Button/Button'

export type ProfilePageProps = {} & BasicRouteProps

const ProfilePage: React.FunctionComponent<ProfilePageProps> = ({
  history,
}) => {
  const { appInitialized, logout, user } = React.useContext(AppContext)

  React.useEffect(() => {
    if (appInitialized) {
      if (user) {
        // TODO: fetch profile and display it!
      } else {
        history.push('/account/login')
      }
    }
  }, [appInitialized, user])

  return appInitialized && user ? (
    <>
      <h2>My Profile</h2>
      <div style={{ color: '#777', marginBottom: '1rem' }}>
        (Insert late 90's "Under Construction" GIF here...)
      </div>
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  ) : null
}

export default ProfilePage
