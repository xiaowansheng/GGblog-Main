// import Cherry from 'cherry-markdown/dist/cherry-markdown.core'
import CherryMermaidPlugin from 'cherry-markdown/dist/addons/cherry-code-block-mermaid-plugin'
import mermaid from 'mermaid'
import CherryEngine from 'cherry-markdown/dist/cherry-markdown.engine.core'
const callbacks = {
  /**
   * 全局的URL处理器
   * @param {string} url 来源url
   * @param {'image'|'audio'|'video'|'autolink'|'link'} srcType 来源类型
   * @returns
   */
  urlProcessor: (url: string, srcType: 'image' | 'audio' | 'video' | 'autolink' | 'link') => url,
  beforeImageMounted: (srcProp: string, src: string) => ({ srcProp, src }),
  // 预览区域点击事件，previewer.enablePreviewerBubble = true 时生效
  onClickPreview: (event: Event) => {},
  // 复制代码块代码时的回调
  onCopyCode: (event: Event, code: string) => {
    // 阻止默认的粘贴事件
    // return false;
    // 对复制内容进行额外处理
    return code
  },
  // 获取中文的拼音
  changeString2Pinyin: (string: string) => {
    /**
     * 推荐使用这个组件：https://github.com/liu11hao11/pinyin_js
     *
     * 可以在 ../scripts/pinyin/pinyin_dist.js 里直接引用
     */
    // return pinyin.pinyin(string, " ");
    return string
  }
}

const setConfig=(id?: string, mdStr?: string)=>{
  return {
    // id: id,
    // value: mdStr,
    // externals: {
    //   echarts: echarts,
    //   katex: katex
    //   // MathJax: MathJax TODO
    // },
    editor: {
      defaultModel: 'previewOnly'
    },
    previewer: {
      dom: false,
      className: 'cherry-markdown',
      enablePreviewerBubble: true,
      /**
       * 配置图片懒加载的逻辑
       * - 如果不希望图片懒加载，可配置成 lazyLoadImg = {noLoadImgNum: -1}
       * - 如果希望所有图片都无脑懒加载，可配置成 lazyLoadImg = {noLoadImgNum: 0, autoLoadImgNum: -1}
       * - 如果一共有15张图片，希望：
       *    1、前5张图片（1~5）直接加载；
       *    2、后5张图片（6~10）不论在不在视区内，都无脑懒加载；
       *    3、其他图片（11~15）在视区内时，进行懒加载；
       *    则配置应该为：lazyLoadImg = {noLoadImgNum: 5, autoLoadImgNum: 5}
       */
      lazyLoadImg: {
        // 加载图片时如果需要展示loading图，则配置loading图的地址
        loadingImgPath: '',
        maxNumPerTime: 2,
        // 不进行懒加载处理的图片数量，如果为0，即所有图片都进行懒加载处理， 如果设置为-1，则所有图片都不进行懒加载处理
        noLoadImgNum: 5,
        autoLoadImgNum: 5,
        maxTryTimesPerSrc: 2,
        // 加载一张图片之前的回调函数，函数return false 会终止加载操作
        beforeLoadOneImgCallback: (img: HTMLImageElement) => true,
        // 加载一张图片失败之后的回调函数
        failLoadOneImgCallback: (img: HTMLImageElement) => {},
        // 加载一张图片之后的回调函数，如果图片加载失败，则不会回调该函数
        afterLoadOneImgCallback: (img: HTMLImageElement) => {},
        // 加载完所有图片后调用的回调函数
        afterLoadAllImgCallback: () => {}
      }
    },
    engine: {
      // 全局配置
      global: {
        // 是否启用经典换行逻辑
        // true：一个换行会被忽略，两个以上连续换行会分割成段落，
        // false： 一个换行会转成<br>，两个连续换行会分割成段落，三个以上连续换行会转成<br>并分割段落
        classicBr: false,
        /**
         * 全局的URL处理器
         * @param {string} url 来源url
         * @param {'image'|'audio'|'video'|'autolink'|'link'} srcType 来源类型
         * @returns
         */
        urlProcessor: (url, srcType) => {
          console.log(`url-processor`, url, srcType)
          return url
        },
        /**
         * 额外允许渲染的html标签
         * 标签以英文竖线分隔，如：htmlWhiteList: 'iframe|script|style'
         * 默认为空，默认允许渲染的html见src/utils/sanitize.js whiteList 属性
         * 需要注意：
         *    - 启用iframe、script等标签后，会产生xss注入，请根据实际场景判断是否需要启用
         *    - 一般编辑权限可控的场景（如api文档系统）可以允许iframe、script等标签
         */
        htmlWhiteList: ''
      },
      // 内置语法配置
      syntax: {
        // 语法开关
        // 'hookName': false,
        // 语法配置
        // 'hookName': {
        //
        // }
        codeBlock: {
          theme: 'default',
          // 超出长度是否换行，false则显示滚动条
          wrap: false,
          lineNumber: true,
          // 是否显示“复制”按钮
          copyCode: true
        },
        list: {
          listNested: false,
          // 同级列表类型转换后变为子级
          indentSpace: 2 // 默认2个空格缩进
        },
        table: {
          enableChart: true
          // chartEngine: Engine Class
        },
        fontEmphasis: {
          /**
           * 是否允许首尾空格
           * 首尾、前后的定义： 语法前**语法首+内容+语法尾**语法后
           * 例：
           *    true:
           *           __ hello __  ====>   <strong> hello </strong>
           *           __hello__    ====>   <strong>hello</strong>
           *    false:
           *           __ hello __  ====>   <em>_ hello _</em>
           *           __hello__    ====>   <strong>hello</strong>
           */
          allowWhitespace: false // 是否允许首尾空格
        },
        strikethrough: {
          /**
           * 是否必须有前后空格
           * 首尾、前后的定义： 语法前**语法首+内容+语法尾**语法后
           * 例：
           *    true:
           *            hello wor~~l~~d     ====>   hello wor~~l~~d
           *            hello wor ~~l~~ d   ====>   hello wor <del>l</del> d
           *    false:
           *            hello wor~~l~~d     ====>   hello wor<del>l</del>d
           *            hello wor ~~l~~ d     ====>   hello wor <del>l</del> d
           */
          needWhitespace: false // 是否必须有前后空格
        },
        mathBlock: {
          engine: 'MathJax', // katex或MathJax
          src: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js', // 如果使用MathJax plugins，则需要使用该url通过script标签引入
          plugins: true // 默认加载插件
        },
        inlineMath: {
          engine: 'MathJax' // katex或MathJax
        },
        emoji: {
          useUnicode: false,
          customResourceURL:
            'https://github.githubassets.com/images/icons/emoji/unicode/${code}.png?v8',
          upperCase: true
        },
        toc: {
          tocStyle: 'nested',
          /** 默认只渲染一个目录 */
          allowMultiToc: false
        },
        // 'header': {
        //   strict: false
        // },
        header: {
          /**
           * 标题的样式：
           *  - default       默认样式，标题前面有锚点
           *  - autonumber    标题前面有自增序号锚点
           *  - none          标题没有锚点
           */
          anchorStyle: 'default'
        }
      }
    },
    toolbars: {
      toolbar: false
    },
    forceAppend: false,
    locale: 'zh_CN',
    keydown: [],
    //extensions: [],
    callback: {
      beforeImageMounted: callbacks.beforeImageMounted,
      onClickPreview: callbacks.onClickPreview,
      onCopyCode: callbacks.onCopyCode,
      changeString2Pinyin: callbacks.changeString2Pinyin
      // beforeImageMounted: callbacks.beforeImageMounted
    }
  }
}


// 插件注册必须在Cherry实例化之前完成
CherryEngine.usePlugin(CherryMermaidPlugin, {
  mermaid // 传入mermaid引用
  // mermaidAPI: mermaid.mermaidAPI, // 也可以传入mermaid API
  // 同时可以在这里配置mermaid的行为，可参考mermaid官方文档
  // theme: 'neutral',
  // sequence: { useMaxWidth: false, showSequenceNumbers: true }
})

// 引入Cherry引擎核心构建
// 引擎配置项与Cherry通用，以下文档内容仅介绍Cherry核心包
const cherryEngineInstance = new CherryEngine()
export function mdConvertToHtml(mdStr: string): string {
  const htmlContent = cherryEngineInstance.makeHtml(mdStr)
  return htmlContent
}

// export function mdShow(id:string,mdStr: string): Cherry {
// const cherryInstance = new Cherry(setConfig(id,mdStr))
//   // const htmlContent = cherryEngineInstance.makeHtml(mdStr)
//   return cherryInstance
// }