/**
 * 对象转json字符串
 * @param obj
 * @returns
 */
export function objToString(obj: object): string {
  return JSON.stringify(obj)
}

/**
 * 字符串转对象
 * @param str
 * @returns
 */
export function strToObj(str: string): any {
  return JSON.parse(str)
}

/**
 * 存储数据到本地
 * @param key
 * @param value
 */
export function storageLocal(key: string, value: object | string) {
  try {
    if (typeof value == 'string') {
      localStorage.setItem(key, value)
    } else {
      let str = JSON.stringify(value)
      localStorage.setItem(key, str)
    }
  } catch (e) {
    console.error(value, '数据不能转换为json字符串。', value)
  }
}

/**
 * 获取本地存储的数据
 * @param key
 * @returns
 */
export function getLocalStorage(key: string): any {
  let str = localStorage.getItem(key) ?? ''
  try {
    let obj = JSON.parse(str)
    return obj
  } catch (e) {
    // console.error('字符串不能转换为对象。', str)
    return str
  }
}

/**
 * 清除本地存储的数据
 * @param key
 * @returns
 */
export function removeLocalStorage(key: string) {
  localStorage.removeItem(key)
}
