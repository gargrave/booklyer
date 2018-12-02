import { RouteProps } from 'react-router'

import BooksListPage from './BooksListPage/BooksListPage'

import urls from 'config/urls'

const baseUrl = urls.booksList

const routes: RouteProps[] = [
  {
    component: BooksListPage,
    exact: true,
    path: baseUrl,
  },
]

export default routes
