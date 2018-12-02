import { RouteProps } from 'react-router'

import BooksListContainer from './BooksListPage/BooksListContainer'

import urls from 'config/urls'

const baseUrl = urls.booksList

const routes: RouteProps[] = [
  {
    component: BooksListContainer,
    exact: true,
    path: baseUrl,
  },
]

export default routes
