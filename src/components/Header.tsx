import style from '@/styles/header.module.css'
import Toggle from '@/components/Toggle'
import { useLangs } from '@/hooks/useLangs';
import { Lang } from '@/consts/lang';

type Props = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const option: { [x in string]: Lang } = {
  '日': 'ja',
  '東': 'x-pmcp'
}

const Header = ({ searchText, setSearchText }: Props) => {
  const { langs: { envLang, searchLang }, setLangs } = useLangs()
  return (
    <header>
      <div
        className={style.titleContainer}
        onClick={() => {
          setLangs(() => searchLang === 'ja'
            ? { envLang, searchLang: 'x-pmcp' }
            : { envLang, searchLang: 'ja' }
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
            onChange={(e) => setLangs({ envLang: option[e.target.value], searchLang })}>
            {Object.keys(option).map((key) => <option value={key}>{key}</option>)}
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