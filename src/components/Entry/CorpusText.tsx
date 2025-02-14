import MatchedPortion from '@/components/Entry/MatchedPortion'
import PMCPText from '@/components/Entry/PMCPText'
import getComparedToken from '@/hooks/getComparedToken'
import tokenize from '@/hooks/tokenize'
import style from '@/styles/entry.module.css'
import CopyButton from './CopyButton'

type Props = {
  fullText: string,
  highlighted?: {
    beginIndex: number,
    endIndex: number,
    match: string
  },
}

const CorpusText = ({ fullText, highlighted }: Props) => {
  const tokens = tokenize(fullText)
  let offset = 0

  return (
    <div className={style.corpusText}>
      <CopyButton copiedText={fullText} />
      {tokens.map((tok, index) => {
        const tokStart = offset
        const tokEnd = offset + tok.content.length

        const comparedToken = (highlighted != undefined)
          ? getComparedToken(offset, tokStart, tokEnd, tok, highlighted)
          : tok.content

        offset += tok.content.length

        switch (tok.kind) {
          case 'pmcp-word': {
            return (
              <PMCPText key={index} hasTooltip={true} token={tok} comparedToken={comparedToken} />
            )
          }
          case 'eof': {
            return (
              <PMCPText key={index} hasTooltip={false} token={tok} comparedToken={comparedToken} />
            )
          }
          case 'others':
            return (
              <PMCPText key={index} hasTooltip={false} token={tok} comparedToken={comparedToken} />
            )
          case 'problematic-brace': {
            if (typeof comparedToken === 'string') {
              return (
                <span key={index} className={style.problematicBrace}>
                  {comparedToken}
                </span>
              )
            } else {
              return (
                <span key={index} className={style.problematicBrace}>
                  {comparedToken.beforeMatch}
                  <MatchedPortion matchedToken={comparedToken} />
                  {comparedToken.afterMatch}
                </span>
              )
            }
          }
        }
      })}
    </div>
  )
}

export default CorpusText