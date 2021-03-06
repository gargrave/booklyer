import * as React from 'react'

import { BasicRouteProps } from 'app/core/core.types'
import { AppContext } from 'app/core/AppIndex/App.context'

import { Button } from 'packages/common'

export type ProfilePageProps = {} & BasicRouteProps

export const ProfilePage: React.FC<ProfilePageProps> = ({
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
  }, [appInitialized, user]) // eslint-disable-line

  return appInitialized && user ? (
    <>
      <h2>My Profile</h2>
      <div style={{ color: '#777', marginBottom: '1rem' }}>
        {/* eslint-disable-next-line react/no-unescaped-entities */}
        (Insert late 90's "Under Construction" GIF here...)
      </div>
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </>
  ) : null
}
