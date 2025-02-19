import { Lang } from '@/consts/lang'
import { getMatches } from '@/hooks/ts-src/search'

self.onmessage = async (e: MessageEvent<{searchText: string, searchLang: Lang}>) => {
  const { searchText, searchLang } = e.data
  if (searchText === '') {
    self.postMessage([])
  }
  const result = await getMatches(searchText, searchLang)
  self.postMessage(result)
}

export {} // to avoid TS4023