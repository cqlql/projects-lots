import transitionendOnce from './transitionend-once'
export default function transitionendOncePromise (elem) {
  return new Promise(resolve => {
    transitionendOnce(elem, resolve)
  })
}
