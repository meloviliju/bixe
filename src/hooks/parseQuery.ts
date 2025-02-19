import queryString from 'query-string'
import { isLang, Langs } from '@/consts/lang'

const parseQuery = (queryParams: queryString.ParsedQuery): Langs => {
  const [env, search] = [queryParams['env'], queryParams['search']]
  return {
    envLang: (typeof env === 'string' && isLang(env)) ? env : 'x-pmcp',
    searchLang: (typeof search === 'string' && isLang(search)) ? search : 'ja',
  }
}

export default parseQuery