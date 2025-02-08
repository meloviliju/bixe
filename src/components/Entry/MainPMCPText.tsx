import '@/styles/common.css'
import { useContext } from 'react'
import MatchedPortion from '@/components/Entry/MatchedPortion'
import { MatchedToken } from '@/consts/types'
import langContext from '@/hooks/langContext'
import style from '@/styles/tooltip.module.css'

type Props = {
  isBlatant: boolean,
  isEarthling: boolean,
  comparedToken: string | MatchedToken,
}

const MainPMCPText = ({ isBlatant, isEarthling, comparedToken }: Props) => {
  const { envLang, searchLang } = useContext(langContext)

  return (
    <span className={`${style.mainText
      } ${isBlatant ? style.blatantTypo : ''
      } ${isEarthling ? style.inEarthlingList : ''
      } ${envLang === 'x-pmcp' ? 'pmcp' : ''
      }`}>
      {searchLang === 'ja' && typeof comparedToken !== 'string'
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
        <MatchedPortion
          isZeroWidth={comparedToken.matchedPortion.isZeroWidth}
          content={comparedToken.matchedPortion.content}
        />
        {comparedToken.afterMatch}
      </>
    )
  }
}

export default MainPMCPText