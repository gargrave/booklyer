import * as React from 'react'

import { useRequiredAuthentication } from '../utils/useRequiredAuthentication'

import Button from 'app/common/Button/Button'

export type ProfilePageProps = {
  history: any
}

const ProfilePage: React.FunctionComponent<ProfilePageProps> = ({
  history,
}) => {
  const { getUser, logout } = useRequiredAuthentication(history)
  const [user, setUser] = React.useState(getUser())

  React.useEffect(() => {
    setUser(getUser())
  }, [user])

  return user ? (
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
