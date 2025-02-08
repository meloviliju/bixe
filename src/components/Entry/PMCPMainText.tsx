import '@/styles/common.css'
import { useContext } from 'react'
import MatchedPortion from '@/components/Entry/MatchedPortion'
import { MatchedToken, Token } from '@/consts/types'
import langContext from '@/hooks/langContext'
import style from '@/styles/tooltip.module.css'
import { isBlatantTypo } from '@/hooks/ts-src/blatant-typo'
import { isEarthlingWord } from '@/hooks/ts-src/earthling'

type Props = {
  token: Token,
  comparedToken: string | MatchedToken,
}

const PMCPMainText = ({ token, comparedToken }: Props) => {
  const { envLang, searchLang } = useContext(langContext)
  const isBlatant = isBlatantTypo(token.content)
  const isEarthling = isEarthlingWord(token.content)

  return (
    <span className={`${style.mainText
      } ${isBlatant ? style.blatantTypo : ''
      } ${isEarthling ? style.inEarthlingList : ''
      } ${envLang === 'x-pmcp' ? 'pmcp' : ''
      }`}>
      {searchLang === 'ja' && typeof comparedToken !== 'string'
        // here shouldn't be highlighted
        ? `${comparedToken.beforeMatch}${comparedToken.matchedPortion.content}${comparedToken.afterMatch}`
        : <MainTextContent comparedToken={comparedToken} />}
    </span>
  )
}

const MainTextContent = ({ comparedToken }: { comparedToken: string | MatchedToken }) => {
  if (typeof comparedToken === 'string') {
    return <>{comparedToken}</>
  } else {
    return (
      <>
        {comparedToken.beforeMatch}
        <MatchedPortion matchedToken={comparedToken}/>
        {comparedToken.afterMatch}
      </>
    )
  }
}

export default PMCPMainText