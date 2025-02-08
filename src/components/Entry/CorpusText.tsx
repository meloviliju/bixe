import MatchedPortion from '@/components/Entry/MatchedPortion'
import PMCPWord from '@/components/Entry/PMCPWord'
import getComparedToken from '@/hooks/getComparedToken'
import tokenize from '@/hooks/tokenize'
import style from '@/styles/entry.module.css'

type Props = {
  fullText: string,
  source: string,
  highlighted?: {
    beginIndex: number,
    endIndex: number,
    match: string
  },
}

const CorpusText = ({ fullText, source, highlighted }: Props) => {
  const tokens = tokenize(fullText)
  let offset = 0

  return (
    <div className={style.corpusText}>
      {tokens.map((tok, index) => {
        const tokStart = offset
        const tokEnd = offset + tok.content.length

        const comparedToken = (highlighted !== undefined)
          ? getComparedToken(offset, tokStart, tokEnd, tok, highlighted)
          : tok.content

        offset += tok.content.length
        
        switch (tok.kind) {
          case 'pmcp-word': {
            return <PMCPWord key={index} token={tok} comparedToken={comparedToken} source={source} />
          }
          case 'others':
          case 'eof': {
            return <PMCPWord key={index} token={tok} comparedToken={comparedToken} source={source} />
          }
          case 'problematic-brace': {
            return (
              <span className="problematic-brace" key={index}>
                {
                  typeof comparedToken === 'string' ?
                    comparedToken :
                    `${comparedToken.beforeMatch}${<MatchedPortion
                      isZeroWidth={comparedToken.matchedPortion.isZeroWidth}
                      content={comparedToken.matchedPortion.content}
                    />}${comparedToken.afterMatch}`
                }
              </span>
            )
          }
        }
      })}
    </div>
  )
}

export default CorpusText