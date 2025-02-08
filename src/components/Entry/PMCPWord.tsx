import MainPMCPText from '@/components/Entry/MainPMCPText'
import Tooltip from '@/components/Entry/Tooltip'
import { MatchedToken, Token } from '@/consts/types'
import { isBlatantTypo } from '@/hooks/ts-src/blatant-typo'
import { isEarthlingWord, expectedSourcesForEarthlingWord } from '@/hooks/ts-src/earthling'
import style from '@/styles/tooltip.module.css'

type Props = {
  token: Token,
  comparedToken: string | MatchedToken,
  source: string,
}

const PMCPWord = ({ token, comparedToken, source }: Props) => {
  const isEarthling = isEarthlingWord(token.content)
  const isBlatant = isBlatantTypo(token.content)
  if (isEarthling) {
    const expected_sources = expectedSourcesForEarthlingWord(token.content);
    if (
      !(expected_sources as string[]).includes(source)
      && !expected_sources.includes('__GLOBAL__')
    ) {
      alert(`Note: Word "${token.content}" is considered an Earthling word and is expected to be found only in sources ${JSON.stringify(expected_sources)} but was found in "${source}". Edit earthling.ts to fix this.\n業務連絡：単語「${token.content}」は現世都合の単語として扱われ、${JSON.stringify(expected_sources)} 以外の資料には出現しない想定ですが、"${source}" に出現しています。earthling.ts を修正してください。`);
    }
  } else if (isBlatant) {

  }
  return (
    <span className={style.hoverText}>
      <MainPMCPText
        comparedToken={comparedToken}
        isBlatant={isBlatant}
        isEarthling={isEarthling}
      />
      <Tooltip
        text={token.content}
        isBlatantTypo={isBlatant}
        isEarthlingWord={isEarthling}
      />
    </span>
  )
}

export default PMCPWord