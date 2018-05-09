// RandomNums

import Animation from './animation'
import Queue from '../corejs/queue'

function getRandomIndex (len) {
  return ~~(Math.random() * 200) % len
}
function getRandomNum (d) {
  return d.splice(getRandomIndex(d.length), 1)[0]
}
function getRandomNums () {
  let d = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
  return [getRandomNum(d), getRandomNum(d), getRandomNum(d), getRandomNum(d)]
}

export default class {
  constructor () {
    this.animation = new Animation()
    this.queue = new Queue()
  }
  start (excu, complete) {
    let {queue} = this
    for (let index = 0; index < 10; index++) {
      queue.excu(cb => {
        excu(getRandomNums())
        setTimeout(() => {
          if (queue.q.length === 0) {
            complete()
          }
          cb()
        }, 100)
      })
    }
  }
  getIndex (len) {
    return ~~(Math.random() * 200) % len
  }
}
