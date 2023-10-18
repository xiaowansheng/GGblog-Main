import type { App } from 'vue'
import SvgIcon from "@/components/icons/index.vue"

export function useSvgIcon(app: App) {
  app.component('svg-icon', SvgIcon)
}
