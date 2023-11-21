type AnyFunction = (...args: any[]) => any

type DebouncedFunction<F extends AnyFunction> = (...args: Parameters<F>) => void
/**
 *  防抖函数，防止短时间内执行多次
 *    每次执行返回的函数都会清除上一此的延迟函数
 * @param func 延迟执行的方法
 * @param delay 延迟时间，单位毫秒
 * @returns 返回一个函数
 */
export function debouncedFunction<F extends AnyFunction>(func: F, delay: number=300): DebouncedFunction<F> {
  let timeoutId: number

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const context = this

    clearTimeout(timeoutId)
    timeoutId = window.setTimeout(() => {
      func.apply(context, args)
    }, delay)
  }
}
