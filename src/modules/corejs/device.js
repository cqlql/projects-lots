/**
 * Created by cql on 2017/3/14.
 */
let {userAgent} = navigator
export let isIOS = userAgent.indexOf('Mac OS') > -1
export let isMobileIOS = /iPad|iPhone/.test(userAgent)
export let isAndroid = /Android/.test(userAgent)
export let isWX = /micromessenger/i.test(userAgent)

/**
 * android 版本获取
 *
 * @return {string|null} 返会此格式的'4.4'字符串 | 非android设备返会null
 * */
let androidVersion
export function getAndroidVersion () {
  if (androidVersion === undefined) {
    let r = userAgent.match(/Android (\d.\d)/)
    androidVersion = r && r[1]
    return androidVersion
  }
  return androidVersion
}
