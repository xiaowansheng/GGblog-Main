/**
 *  防抖函数，防止短时间内执行多次
 *    每次执行返回的函数都会清除上一此的延迟函数
 * @param func 延迟执行的方法
 * @param time 延迟时间，单位毫秒
 * @returns 返回一个函数
 */
export function debouncedFunction(func: Function, time = 300): Function {
  let timerId: ReturnType<typeof setTimeout> | null = null

  return () => {
    if (timerId) {
      clearTimeout(timerId)
    }
    timerId = setTimeout(() => func(), time)
  }
}
