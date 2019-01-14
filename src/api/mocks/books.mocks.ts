import { Book } from 'app/books/books.types'
import { mockAuthors } from './authors.mocks'

const aldousHuxley = mockAuthors[0]
const kurtVonnegut = mockAuthors[1]
const stephenKing = mockAuthors[4]

const mockBooks: Book[] = [
  {
    author: aldousHuxley,
    created: new Date('2018-01-14T01:36:26.220Z'),
    id: 'sv3hmbefpc95MRXQsTHr',
    sortBy: '',
    title: 'Brave New World',
    updated: new Date('2018-01-14T01:36:26.220Z'),
  },
  {
    author: aldousHuxley,
    created: new Date('2018-01-15T01:36:26.220Z'),
    id: 'Hmh9eR3rs5bMvsTXfpcQ',
    sortBy: '',
    title: 'Island',
    updated: new Date('2018-01-15T01:36:26.220Z'),
  },
  {
    author: aldousHuxley,
    created: new Date('2018-01-16T01:36:26.220Z'),
    id: 'eRpcQ5H3rsTXfmh9bMvs',
    sortBy: '',
    title: 'The Doors of Perception',
    updated: new Date('2018-01-16T01:36:26.220Z'),
  },
  {
    author: kurtVonnegut,
    created: new Date('2017-11-01T01:36:26.220Z'),
    id: 'e2TedzRQJKJ1VL5m7QhG',
    sortBy: '',
    title: 'Mother Night',
    updated: new Date('2017-11-01T01:36:26.220Z'),
  },
  {
    author: kurtVonnegut,
    created: new Date('2017-11-01T01:39:26.220Z'),
    id: '8ZYttrQY042IhlZ11BVJ',
    sortBy: '',
    title: 'Breakfast of Champions',
    updated: new Date('2017-11-01T01:39:26.220Z'),
  },
  {
    author: stephenKing,
    created: new Date('2017-10-01T01:39:26.220Z'),
    id: '2IYttrQYhlZ118Z04BVJ',
    sortBy: 'Dark Tower 1',
    title: 'The Gunslinger',
    updated: new Date('2017-10-01T01:39:26.220Z'),
  },
  {
    author: stephenKing,
    created: new Date('2017-10-01T01:39:26.220Z'),
    id: '2IYt04BVltrQYhZ118ZJ',
    sortBy: 'Dark Tower 2',
    title: 'The Drawing of the Three',
    updated: new Date('2017-10-01T01:39:26.220Z'),
  },
]

export { mockBooks }
