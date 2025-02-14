import style from '@/styles/header.module.css'
import Toggle from '@/components/Toggle'
import { useLangs } from '@/hooks/useLangs';
import { Lang } from '@/consts/lang';
import { useEffect, useState } from 'react';

type Props = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const langs: Lang[] = ['ja', 'x-pmcp']
const option = ['日', '東']

const Header = ({ searchText, setSearchText }: Props) => {
  const { langs: { envLang, searchLang }, setLangs } = useLangs()
  const [optionIndex, setOptionIndex] = useState(langs.indexOf(envLang))

  useEffect(() => {
    setLangs({
      searchLang: langs[optionIndex],
      envLang
    })
  }, [optionIndex, setLangs])

  return (
    <header>
      <div
        className={style.titleContainer}
        onClick={() => {
          setLangs(() => envLang === 'ja'
            ? { envLang: 'x-pmcp', searchLang }
            : { envLang: 'ja', searchLang }
          )
        }}>
        <div className={style.title}>
          <div className={style.b}>🔍</div>
          <div className={envLang === 'x-pmcp' ? style.ixePMCP : style.ixeJa}>ixe</div>
        </div>
      </div>
      <div>東島通商語コーパス検索システム「ビシェ」{searchLang === 'ja' ? '（日本語からの検索）' : ''}</div>
      <section className={style.searchSection}>
        <div className={style.searchContainer}>
          <select
            className={style.searchOption}
            value={option[optionIndex]}
            onChange={(e) => setOptionIndex(option.indexOf(e.target.value))}>
            {option.map((o, i) => <option key={i} value={o}>{o}</option>)}
          </select>
          <input
            type="text"
            className={style.searchBar}
            value={searchText}
            placeholder="正規表現で検索　^ で検索すると全ての例文がヒットします"
            accessKey="f"
            autoCapitalize="none"
            autoComplete="off"
            onChange={(e) => { setSearchText(e.target.value) }} />
          <Toggle />
        </div>
      </section>
    </header >
  )
}

export default Header