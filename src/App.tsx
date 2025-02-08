import { useState } from 'react'
import ResultSection from './components/Entry/ResultSection'
import Header from './components/Header'
import { Langs } from './consts/lang'
import langsContext from './hooks/langContext'
import './styles/common.css'
import Footer from './components/Footer'
import parseQuery from './hooks/parseQuery'
import queryString from 'query-string'
import { Result } from './consts/types'

function App() {
  const [result, setResult] = useState<Result[]>([])
  const [searchText, setSearchText] = useState("")

  const getLang = (): Langs => {
    // define `searchLang` and `envLang` from parameters
    // now mocking
    const { envLang, searchLang } = parseQuery(queryString.parse(location.search))
    return {
      envLang: envLang,
      searchLang: searchLang,
    }
  }

  return (
    <langsContext.Provider value={getLang()}>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <ResultSection results={result} />
      <ResultSection results={[{
        item: {
          "source": "日本の遊戯 第一号",
          "pmcp": "icco cecnutit lata pi lata cecnutit icco cetkail kingu",
          "directJa": "国が人を守り、人が国を守る",
          "ja": "国が人を守り、人が国を守る",
          "en": "The country protects the people, and the people protect the country."
        },
        "matchedPortions": [
          { "match": "cecnutit", "beginIndex": 5, "endIndex": 13 },
          { "match": "cecnutit", "beginIndex": 27, "endIndex": 35 }
        ]
      }]} />
      <Footer />
    </langsContext.Provider>
  )
}

export default App
