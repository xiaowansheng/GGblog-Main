//得到默认使用的语言
export function getDefaultLang() {
  //用户未指定时，根据游览器选择:
  if (navigator.language == 'zh-CN') {
    return 'zh'
  } else if (navigator.language == 'en-US') {
    return 'en'
  } else {
    return 'en'
  }
}
