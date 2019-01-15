import produce from 'immer'

import { ReduxAction } from 'app/core/types'

import { Book } from '../books.types'

export const actionTypes = {
  CREATE_BOOK: 'BOOKS/CREATE_BOOK',
  CREATE_BOOK_FAILURE: 'BOOKS/CREATE_BOOK_FAILURE',
  CREATE_BOOK_SUCCESS: 'BOOKS/CREATE_BOOK_SUCCESS',

  FETCH_BOOKS: 'BOOKS/FETCH_BOOKS',
  FETCH_BOOKS_FAILURE: 'BOOKS/FETCH_BOOKS_FAILURE',
  FETCH_BOOKS_SUCCESS: 'BOOKS/FETCH_BOOKS_SUCCESS',
}

export type BooksState = {
  data: Book[]
  requestPending: boolean
}

const defaultState = (): BooksState => ({
  data: [],
  requestPending: false,
})

const reducers = (state: BooksState = defaultState(), action: ReduxAction) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.CREATE_BOOK:
        console.log('Reducer: CREATE_BOOK')
        return state

      case actionTypes.CREATE_BOOK_SUCCESS:
        console.log('Reducer: CREATE_BOOK_SUCCESS')
        return state

      case actionTypes.CREATE_BOOK_FAILURE:
        console.log('Reducer: CREATE_BOOK_FAILURE')
        return state

      case actionTypes.FETCH_BOOKS_SUCCESS:
        draft.data = action.payload
        return
    }
  })

export default reducers
