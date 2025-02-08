import style from '@/styles/header.module.css'
import Toggle from '@/components/Toggle'

type Props = {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

const Header = ({ searchText, setSearchText }: Props) => {
  return (
    <header>
      <div className={style.titleContainer}>
        <a href="search_.html" className={style.title}>
          <div className={style.b}>🔍</div>
          <div className={style.ixe}>ixe</div>
        </a>
      </div>
      <div>東島通商語コーパス検索システム「ビシェ」</div>
      <section className={style.searchSection}>
        <div className={style.searchContainer}>
          <input type="text" className={style.searchBar} placeholder="正規表現で検索　^ で検索すると全ての例文がヒットします" value={searchText} accessKey="f" autoCapitalize="none" autoComplete="off" onChange={(e) => { setSearchText(e.target.value) }} />
          <Toggle />
        </div>
      </section>
    </header>
  )
}

export default Header