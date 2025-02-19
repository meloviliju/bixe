import Entry from '@/components/Entry/Entry'
import { Result } from '@/consts/types'
import style from '@/styles/entry.module.css'

type Props = {
  results: Result[],
  searchText: string,
}

const ResultSection = ({ results, searchText }: Props) => {
  return (
    <>
      {results.length !== 0 && <section className={style.searchCount}>{results.length}個見つかりました。</section>}
      <section className={style.resultsSection}>
        {results.length === 0
          ? searchText === ''
            ? '東島通商語コーパス検索システム「ビシェ」へようこそ。'
            : '見つかりませんでした。'
          : results.map((result, index) => <Entry key={index} result={result} />)
        }
      </section>
    </>
  )
}

export default ResultSection