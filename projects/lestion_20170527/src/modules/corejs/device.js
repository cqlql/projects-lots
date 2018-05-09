/**
 * Created by cql on 2017/3/14.
 */

export let isIOS = navigator.appVersion.indexOf('Mac OS') > -1
export let isMobileIOS = /iPad|iPhone/.test(navigator.userAgent)
export let isAndroid = /Android/.test(navigator.userAgent)
export let isWX = /micromessenger/i.test(navigator.userAgent)

/**
 * android 版本获取
 *
 * @return {string|null} 返会此格式的'4.4'字符串 | 非android设备返会null
 * */
let androidVersion
export function getAndroidVersion () {
  if (androidVersion === undefined) {
    let r = navigator.userAgent.match(/Android (\d.\d)/)
    androidVersion = r && r[1]
    return androidVersion
  }
  return androidVersion
}
