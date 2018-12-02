import { RouteProps } from 'react-router'

import AuthorsListPage from './AuthorsListPage/AuthorsListPage'

import urls from 'config/urls'

const baseUrl = urls.authorsList

const routes: RouteProps[] = [
  {
    component: AuthorsListPage,
    exact: true,
    path: baseUrl,
  },
]

export default routes
