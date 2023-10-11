import { http } from '@/utils/http'

export function getSimpleStatistic() {
  return http.get('/article/user/statistics/number')
}
