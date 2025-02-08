import '@/styles/common.css'
import { Fragment } from 'react'
import MatchedPortion from '@/components/Entry/MatchedPortion'
import { MatchedToken } from '@/consts/types'
import style from '@/styles/entry.module.css'
import tokenize from '@/hooks/tokenize'
import getComparedToken from '@/hooks/getComparedToken'

type Props = {
  fullText: string,
  highlighted?: {
    beginIndex: number,
    endIndex: number,
    match: string
  },
}

const TranslationJa = ({ fullText, highlighted }: Props) => {
  const tokens = tokenize(fullText)
  let offset = 0
  return (
    <div className={style.translationJa}>
      {tokens.map((tok, index) => {
        const tokStart = offset
        const tokEnd = offset + tok.content.length

        const comparedToken = (highlighted != undefined)
          ? getComparedToken(offset, tokStart, tokEnd, tok, highlighted)
          : tok.content

        offset += tok.content.length

        return (
          <Fragment key={index}>
            <MainTextContent comparedToken={comparedToken} />
          </Fragment>
        )
      })}
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
        <MatchedPortion matchedToken={comparedToken} />
        {comparedToken.afterMatch}
      </>
    )
  }
}

export default TranslationJa