import queryString from 'query-string'
import { useRef, useState } from 'react'
import { useEffectOnce } from 'react-use'
import ResultSection from '@/components/Entry/ResultSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Result } from '@/consts/types'
import parseQuery from '@/hooks/parseQuery'
import { useLangs } from '@/hooks/useLangs'

import '@/styles/common.css'

function App() {
  const [result, setResult] = useState<Result[]>([])
  const [searchText, setSearchText] = useState('')
  const { langs: { searchLang }, setLangs } = useLangs()
  const worker = useRef<Worker | null>(null)

  const query = parseQuery(queryString.parse(location.search))

  useEffectOnce(() => {
    worker.current = new Worker(new URL('./hooks/worker/worker.ts', import.meta.url), {
      type: 'module'
    })
    worker.current.onmessage = (e) => {
      const data = e.data
      setResult(data)
    }
    return () => {
      worker.current?.terminate()
    }
  })

  useEffectOnce(() => {
    const { envLang, searchLang } = query
    setLangs({
      envLang: envLang,
      searchLang: searchLang,
    })
  })

  const hanldeInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchText(value)

    console.log(`input changed to: ${value}`)

    if (worker.current) {
      console.log('worker exists')
      worker.current.postMessage({ searchText: value, searchLang })
    }

    // if (abortControllerRef.current) {
    //   abortControllerRef.current.abort()
    // }

    // abortControllerRef.current = new AbortController()
    // const signal = abortControllerRef.current.signal

    // if (signal.aborted) {
    //   console.log('aborted')
    //   return
    // }

    // try {
    //   setResult(value === '' ? [] : await getMatches(value, searchLang))
    // } catch (e) {
    //   console.error('Error: occurred while Matching: ', e)
    // }
  }

  return (
    <>
      <Header searchText={searchText} handleInputChange={hanldeInputChange} />
      <ResultSection results={result} searchText={searchText} />
      <Footer />
    </>
  )
}

export default App
