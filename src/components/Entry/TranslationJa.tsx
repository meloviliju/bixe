import '@/styles/common.css'
import { useContext } from 'react'
import MatchedPortion from '@/components/Entry/MatchedPortion'
import { MatchedToken } from '@/consts/types'
import style from '@/styles/entry.module.css'
import langContext from '@/hooks/langContext'

type Props = {
  comparedToken: string | MatchedToken,
}

const TranslationJa = ({ comparedToken }: Props) => {
  const { searchLang } = useContext(langContext)

  return (
    <div className={style.translationJa}>
      {searchLang === 'ja' && typeof comparedToken !== 'string'
        ? `${comparedToken.beforeMatch}${comparedToken.matchedPortion.content}${comparedToken.afterMatch}`
        : <MainTextContent comparedToken={comparedToken} />}
    </div>
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

export default TranslationJa