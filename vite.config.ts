import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' 

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  //检查process.cwd()路径下.env.development.local、.env.development、.env.local、.env这四个环境文件
  loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      createSvgIconsPlugin({
        // 需要自动导入的 svg 文件目录（可自行修改）我的路径如下图所示
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icon')],
        // 执行icon name的格式（可自行修改）
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
