import { getBeer } from './database/queries'

export const getRandomPic = id => `http://i.pravatar.cc/150?u=${id}`
export const sleep = time =>
  new Promise(resolve =>
    setTimeout(() => {
      resolve()
    }, time * 1000)
  )

const greetings = [
  ['Konnichi wa ', '-san'],
  ['General ', ''],
  ['Bonjour ', ''],
  ['Hello there ', ''],
  ['', ', are you drinking responsibly?'],
]

export const greet = name => {
  const strs = greetings[Math.floor(Math.random() * greetings.length)]
  return `${strs[0]}${name}${strs[1]}`
}

export const updateBeerCacheWithCheckin = (store, id, checkin) => {
  const previousBeerQuery = {
    query: getBeer,
    variables: {
      id,
      detailed: true,
    },
  }

  const data = store.readQuery(previousBeerQuery)
  const newData = {
    ...data,
    beer: {
      ...data.beer,
      check_ins: [checkin, ...data.beer.check_ins],
    },
  }
  store.writeQuery({ ...previousBeerQuery, data: newData })
}
