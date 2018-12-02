import { RouteProps } from 'react-router'

import AuthorsListContainer from './AuthorsList/AuthorsListContainer'

import urls from 'config/urls'

const baseUrl = urls.authorsList

const routes: RouteProps[] = [
  {
    component: AuthorsListContainer,
    exact: true,
    path: baseUrl,
  },
]

export default routes
