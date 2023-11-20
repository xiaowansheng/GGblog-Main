/**
 * 隐藏当前页多余的内容，即隐藏滚动条
 * @param overflowHidden
 */
export function handleScrollbars(overflowHidden: Boolean = true) {
  if (overflowHidden) {
    document.documentElement.style.overflow = 'hidden' // 隐藏文档的滚动条
    document.body.scroll = 'no' // 隐藏 body 元素的滚动条（在一些旧版浏览器可能不适用）
    // TODO 会导致页面跳到顶部
    // document.body.style.overflow = 'hidden' // 禁止滚动
  } else {
    document.documentElement.style.overflow = '' // 隐藏文档的滚动条
    document.body.scroll = 'yes' // 隐藏 body 元素的滚动条（在一些旧版浏览器可能不适用）
    // document.body.style.overflow = '' // 禁止滚动
  }
}
